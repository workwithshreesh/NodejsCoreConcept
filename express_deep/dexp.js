const expr = require("express");

const app = expr();

app.get("/",(req,res)=>{
    return res.send(`<h1>Hello From ${req.query.name}</h1>`)
});

app.get("/about",(req,res)=>{
    return res.send(`<h1>Hello from about ${req.query.name}</h1>`)
});

app.listen(3000,()=>console.log("Server Started !!!"))
