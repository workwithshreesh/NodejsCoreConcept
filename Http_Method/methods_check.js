const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req,res)=>{
    const logs = `${Date.now()}: ${req.method}: ${req.url}New Request Found\n`;
    fs.appendFile("logs.txt",logs,(err,data)=>{
        const myUrl = url.parse(req.url,true);
        switch(myUrl.pathname){
            case "/":
                res.end("<h1>This is Home page</h1>")
                break;

            case "/about":
                res.end("<h1>This is a about page</h1>");
                break;
            
            case "/myData":
                if (req.method === "GET") res.end("This data is comes from get request");
                else if (req.method === "POST"){
                    //DB query
                        res.end("Success POST request");
                    }
                break;
            default:
                res.end("404 Not Found!!!");
                
        }
    });
});


myServer.listen(8000, ()=>console.log("Server Started !!!"));