const http = require("http");
const url = require("url");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    const logs = `${Date.now()} ${req.url} New Requiest Found\n`;
    fs.appendFile("logs.txt",logs,(err,data)=>{
        const myUrl = url.parse(req.url, true);
        console.log(myUrl);
        switch(myUrl.pathname){
            case "/":
                res.end("<h1>This is home page.</h1>")
                break;
            case "/about":
                res.end(`<h1>This is about Page</h1>`)
                break;
            case "/myData":
                const {name, email} = myUrl.query
                res.end(`<br><br><h1>My Name:- ${name}</h1> <br><br> <h1>My Email:- ${email}</h1>`);
                break;
            default:
                res.end("<h1>404 Not Found</h1>")
        }
    });
});

myServer.listen(8000, ()=>console.log("Server Started !!!"));