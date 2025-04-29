const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
},
{timestamps:true}
);

const Users = mongoose.model("userauth",userSchema);

module.exports = Users