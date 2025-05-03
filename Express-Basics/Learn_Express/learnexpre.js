const express = require("express")
const http = require("http")

const app = express();

app.get("/",(req,res)=>{
    return res.send("<h1>Hello from home page</h1>")
});

app.get("/about",(req,res)=>{
    return res.send(`<h1>Hello from ${req.query.name} <br><br> ${req.query.email} </h1>`)
});

const myServer = http.createServer(app)

myServer.listen(3000,()=>console.log("Server Started!!!"))