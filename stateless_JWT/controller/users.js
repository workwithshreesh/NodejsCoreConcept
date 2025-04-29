const Users = require("../models/users");
const {setUser} = require("../services/authSet")

async function HandleSignupPage(req,res){
        try{
        let errorMessage = "";
        // errorMessage = "Please fill the valid input";
        const body = req.body
        if (!body) return res.status(400).json({status: "Successfull"});
        await Users.create({
            name: body.name,
            email: body.email,
            password:body.password
        });
        if(body.name && body.email && body.password){
            // const sessionId = "";
            return res.redirect("/login");
        }else{
            return res.send("<h1>Your email and password is incorrect!!!</h1>");
        }
        // return res.render("signup")
        }catch(error){
            return res.redirect("/signup");
        }
}


async function HandleLoginPage(req,res){
    try{
        let errorMessage = ""
        const body = req.body;
        if(!body) return res.status(400).json({status:"Success"})
        const result = await Users.findOne({email:body.email});
        console.log(result)
        if(result && (body.email === result.email) && (body.password === result.password)){
            const token = setUser(result);
            res.cookie("uid",token);
            return res.redirect("/home");
        }
    }
    catch(error){
        errorMessage = "Please fill the valid input";
        return res.render("login");
    }
}


async function HandleHomePage(req,res){
    return res.render("home")
}



module.exports = {
    HandleSignupPage,
    HandleLoginPage,
    HandleHomePage,
}