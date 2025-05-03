const setUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "shreesh@1#2"

function setUser(user){
    // setUserMap.set(id,user);
   
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser,
}