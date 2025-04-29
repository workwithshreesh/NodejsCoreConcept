const sessionIdToUserMap = new Map();

async function setUser(Id, user){
    sessionIdToUserMap.set(Id, user);
}

async function getUser(Id){
    return await sessionIdToUserMap.get(Id)
}

module.exports = {
    setUser,
    getUser,
}