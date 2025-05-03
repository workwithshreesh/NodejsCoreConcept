const express = require("express");
const app = express.Router();
const {HandleHomePage} = require("../controller/users")
const {restricUserOnly} = require("../middleware/retrict")


async function isAuthenticated(req,res,next){
    if(!req.users){
        return res.redirect("/home")
    }
    next()
}

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/home",restricUserOnly,HandleHomePage);

module.exports = app