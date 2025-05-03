const Users = require("../model/users")
const {v4: uuidv4} = require('uuid')
const {setUser, getUser} = require("../service/auth")



// To handle the signup process
async function HandleSignup(req,res) {
    const body = req.body
    if (!body) return res.status(400).json({status: "Successfull"});
    Users.create({
        username: body.username,
        email: body.email,
        password: body.password,
        createdBy: req.users._id,
    });
    if(body.username && body.email && body.password){
        return res.redirect("/login")
    }
    return res.render("signup")
}



// handle home page and fetch all users data
async function HandleHomePageAll(req,res){
    const result = await Users.find({})
    return res.render("home",{alldata: result})
}



// handle the login page check user is varified or not
async function HandleLoginPage(req,res){
    const {email, password} = req.body
    // console.log(body)
    const resultFind = await Users.findOne({email: email})
    try{
        if (resultFind && resultFind.password === password) {
            const sessionId = uuidv4(); // Call uuidv4 as a function
            setUser(sessionId, resultFind);
            res.cookie("uid", sessionId, { httpOnly: true }); // Set the cookie securely
            return res.redirect("/auth/home");
        }else{
            return res.send("<h1>Your email and password is incorrect!!!</h1>");
        }
    } catch(error){
        return res.status(400).json({status:"Successfull",error:error});
    }
}


async function OpenLoginPage(req,res){
    return res.render("login")
}


module.exports = {
    HandleSignup,
    HandleHomePageAll,
    OpenLoginPage,
    HandleLoginPage,
}



