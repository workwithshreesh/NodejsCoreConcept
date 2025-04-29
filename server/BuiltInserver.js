const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    const logs = `${Date.now()} ${req.url}: New Requiest Detected.\n`
    fs.appendFile("logs.txt",logs,(err,data)=>{
        switch(req.url){
            case "/":
                res.end("<h1>This is Home Page</h1>")
                break;
            case "/about":
                res.end("<h1>This is about page</h1>");
                break;
            case "/blog":
                res.end("<h1>This is a blog page</h1>");
                break;
            default:
                res.end("<h1>This is a default page</h1>");
        }
    });
});

myServer.listen(8000,()=>console.log("Server is Started!!!"))