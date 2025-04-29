const sessionIdTouserMap = new Map();

function setUser(id, user){
    sessionIdTouserMap.set(id, user);
    // example of the code output for my understanding setUser("session123", { username: "Shreesh", email: "shreesh@example.com" });

}

function getUser(id){
    return sessionIdTouserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}