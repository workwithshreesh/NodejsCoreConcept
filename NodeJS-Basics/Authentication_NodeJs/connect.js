const mongoose = require("mongoose");

async function MongoDbConnect(url){
    return mongoose.connect(url)
}

module.exports = {
    MongoDbConnect,
}