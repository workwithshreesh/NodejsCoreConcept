const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
},
{timestamps:true}
)

const Users = mongoose.model("userjwt",userSchema);

module.exports = Users