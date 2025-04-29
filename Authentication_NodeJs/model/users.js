const mongoose = require("mongoose");


const authSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        unique:true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
},
{timestamps:true}
);

const Users = mongoose.model("userAuth",authSchema);

module.exports = Users