const express = require("express");
const {connectMongo} = require("./connect");
const { MongoDbConnect } = require("../Authentication_NodeJs/connect");
const router = require("./routes/usersRoute");
const path = require("path");
const cookieParser = require("cookie-parser");
const staticRoute = require("./routes/staticRoute");
const {restricUserOnly} = require("./middleware/retrict")


// express module called on created object
const app = express()


async function startServer(){
    const url = "mongodb://103.54.183.140:49254/practice_trainee";
    const PORT = 8000;
    try{
        await connectMongo(url);
        console.log("Mongo Db is Conected !!!");

        app.listen(PORT,()=>console.log("Port is Listining!!!"));
    }
    catch(error){
        console.log("Failed to connect MongoDb!!!",error);
    }
}

// ejs setup
app.set("view engine","ejs");
app.set("views",path.resolve("./view"));


// setup of midlleware and dataTransers in json and which standard data should be transfer
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use("/",staticRoute);
app.use("/jwt",router);


startServer()
