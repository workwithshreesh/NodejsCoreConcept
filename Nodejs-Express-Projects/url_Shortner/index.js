const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path")
const urlRoute = require("./routing/urlRoute");
const app = express();
const PORT = 3000;
const URL = require("./model/url")
const staticRoute = require("./routing/staticRouter")
const url = "mongodb://103.54.183.140:49254/practice_trainee"
const userRouter = require("./routing/user")
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUser, checkAuth} = require("./middleware/auth")

connectToMongoDB(url).then(()=>console.log("mongo db connected!!!"));


// tamplating engine
app.set("view engine","ejs");
app.set("views",path.resolve("./view"));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use("/",checkAuth,staticRoute);
app.use(express.json());
app.use("/users",userRouter)

// app.get("/", async (req,res)=>{
//     const allUrls = await URL.find({});
//     const context = {allurls: allUrls}
//     return res.render("home",context)
// });

app.use("/url",restrictToLoggedInUser,urlRoute)


app.listen(PORT, () => console.log("Server is started!!!"));