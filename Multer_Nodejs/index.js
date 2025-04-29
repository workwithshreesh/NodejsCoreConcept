const express = require("express");
const multer = require("multer");
const path = require("path")

const app = express();

// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const exten = file.mimetype.split("/")[1];
    //   console.log(exten)
    //   cb(null, file.exten + '-' + uniqueSuffix)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + exten);
    }
  });
  
const upload = multer({ storage: storage });

// ejs setup
app.set("view engine","ejs");
app.set("views",path.resolve("./view"));

// middleware
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    return res.render("home");
});

app.post("/data", upload.single('uploadfile'),(req,res)=>{
    return res.redirect("/");
});

app.listen(8000,()=>console.log("Listening...."));