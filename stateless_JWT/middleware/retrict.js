// const { get } = require("../routes/usersRoute");
const {getUser} = require("../services/authSet");


async function restricUserOnly(req,res,next){
    const userToken = req.cookies?.uid;

    if (!userToken){
        return res.redirect("/login")
    }

    const users = await getUser(userToken);

    if(!userToken){
        return res.redirect("/login")
    }

    req.users = users
    next()
}
   
module.exports = {
    restricUserOnly,
}