const path = require("path")
const express = require("express")
const staticRoute = require("./routing/staticRoute")
const routingRoute = require("./routing/route")
const {MongoDbConnect} = require("./connect")
const app = express()
// const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
 


async function startServer() {
    const url = "mongodb://103.54.183.140:49254/practice_trainee"
    const PORT = 8000
    try {
        await MongoDbConnect(url);
        console.log('MongoDb is connected!!');
        
        app.listen(PORT, () => {
            console.log(`Server Started on port ${PORT}!!!`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

app.set("view engine","ejs");
app.set("views",path.resolve("./view"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())
app.use("/",staticRoute);
app.use("/auth",routingRoute)




startServer();
// app.listen(PORT, ()=>console.log("Server Started!!!"))