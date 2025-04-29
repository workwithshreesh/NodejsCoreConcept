const Users = require("../model/users");
const {v4: uuidv4} = require("uuid")
const {setUser} = require("../services/auth")

// Singup handle
async function HandleSignupPage(req,res) {
    let error_message = ""
    try{
        const {username, email, password} = req.body;
        if (!username || !email || !password){
            error_message = "All feilds are required!!!";
            return res.status(400).render("signup",{error_message:error_message});
        }
        await Users.create({
            username: username,
            email: email,
            password: password,
        });
        return res.redirect("/login");
    }
    catch(error){
        error_message = "User is not created some things happen wrong";
        return res.render("signup",{error_message:error_message})
    }
}


// login handle
async function HandleLoginPage(req,res){
    let error_message = ""
    const {email, password} = req.body;
    try{    
        const result = await Users.findOne({email:email});
        if ((email === result.email) && (password === result.password)){
            const sessionId = uuidv4();
            setUser(sessionId, result);
            res.cookie("uid",sessionId);
            console.log(result)
            return res.redirect("/");
        }else{
            error_message = "Credential is wrong";
            return res.render("login",{error_message:error_message})
        }
    } catch(error){
        error_message = "Login Failed";
        return res.render("login",{error_message:error_message});
    }
}


module.exports = {
    HandleSignupPage,
    HandleLoginPage,
}