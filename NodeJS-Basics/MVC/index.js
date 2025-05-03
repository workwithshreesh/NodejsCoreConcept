const express = require("express");
const fs = require("fs");  

const {connectMongoDb} = require("./connection");
const {logReqRes} = require("./middleware/index")
const userRouter = require("./routing/routes");

const app = express();
const PORT = 8000;


connectMongoDb("mongodb://103.54.183.140:49254/practice_trainee").then(()=>console.log("MongoDb Connected"))


// Middleware - plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));


//Route
app.use("/api/users",userRouter);

app.listen(PORT,() => console.log(`Server Started at PORT:${PORT}`));