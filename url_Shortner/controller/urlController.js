const shortid  = require("shortid");
const URL = require("../model/url")




async function HandleGenrateNewShortURL(req,res){
    const body = req.body
    if (!body.url) return res.status(400).json({error:"url is required"})
    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.users._id,
    });
    return res.redirect("/");
    // return res.render("home", {id: shortID});
}

async function HandleAllData(req, res) {
    try {
        const allData = await URL.find({createdBy: req.users._id});
        // console.log(allData);
        return res.render("home", { alldata: allData });
    } catch (error) {
        console.error("Error fetching all data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function HandleRedirectURL(req,res){
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    },{ $push:{
        visitHistory: {
            timestamps: Date.now()
        }
    }});
    res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne(shortId);
    const context = { totalClicks: result.visitHistory.length,
        analytics: result.visitHistory }
    return res.render("home",context)
}

async function handleGetAllAnalyst(req,res){
    const alldata = await URL.find({});
    // const result = await URL.findOne(shortId);
    // totalClicks: result.visitHistory.length,
    //     analytics: result.visitHistory
    const context = { alldata: alldata }
    return res.render("Analytics",context)
}



async function HandleDeleteURL(shortId) {
    try {
        // Perform the delete operation in the database
        const result = await URL.findOneAndDelete({ shortId: shortId });

        // Return the result for the calling function to handle
        if (!result) {
            return { success: false, message: "URL not found" };
        }

        return { success: true, message: "URL deleted successfully" };
    } catch (error) {
        console.error("Error deleting URL:", error);
        return { success: false, message: "Internal Server Error" };
    }
}




module.exports = {
    HandleGenrateNewShortURL,
    HandleRedirectURL,
    handleGetAnalytics,
    HandleAllData,
    HandleDeleteURL,
    handleGetAllAnalyst,
}