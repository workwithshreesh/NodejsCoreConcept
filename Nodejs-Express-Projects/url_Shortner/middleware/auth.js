const {getUser} = require("../services/auth")

async function restrictToLoggedInUser(req,res,next){
    const userUID = req.cookies?.uid;

    if(!userUID){
        return res.redirect("/login")
    }

    const users = await getUser(userUID);

    if(!users){
        return res.redirect("/login")
    }

    req.users = users
    next();
}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;
    const users = await getUser(userUid);

    req.users = users
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth,
}