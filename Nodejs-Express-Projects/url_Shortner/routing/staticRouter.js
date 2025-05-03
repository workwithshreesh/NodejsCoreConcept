const express = require("express");
const router = express.Router();
const {HandleAllData,handleGetAllAnalyst } = require("../controller/urlController")


async function isAuthenticated(req,res,next){
    if(!req.users){
        return res.redirect("/login")
    }
    next()
}


router.get("/",isAuthenticated,HandleAllData);
router.get("/analytic",handleGetAllAnalyst),
router.get("/signup",(req,res)=>{
    return res.render("signup")
});
router.get("/login",(req,res)=>{
    return res.render("login");
});




module.exports = router;