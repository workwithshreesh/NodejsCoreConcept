const express = require("express");
const app = express.Router()

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

module.exports = app;