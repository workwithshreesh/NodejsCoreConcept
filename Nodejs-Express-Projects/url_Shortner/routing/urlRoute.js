const express = require("express");
const {HandleGenrateNewShortURL, HandleRedirectURL, handleGetAnalytics, HandleDeleteURL, handleGetAllAnalyst} = require("../controller/urlController")
const URL = require("../model/url");

const router = express.Router();

router.post("/", HandleGenrateNewShortURL);
router.get("/:shortId",HandleRedirectURL);
router.get("/analytics/:shortId",handleGetAnalytics)
router.delete("/delete",async (req,res)=>{
    const shortId = req.body.shortId;
    const result = await HandleDeleteURL(shortId);
    if (result.success) {
        return res.status(200).json({ message: result.message });
    } else {
        return res.status(400).json({ error: result.message });
    }
}),


module.exports = router;