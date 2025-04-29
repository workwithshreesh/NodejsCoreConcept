const User = require("../models/user");
const express = require("express")
const app = express()

app.use(express.json());


async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}

async function handleGetUserById(req,res){
    const user = await User.findById(String(req.params.id));
    if (!user) return res.status(404).json({error:"user not found"});
    return res.json(user)
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(String(req.params.id),{ lastName:"Change" });
    return res.json({status:"Success"})
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(String(req.params.id));
    return res.json({status:"Success"})
}

async function handleCreateUserById(req,res){
    const body = req.body;

    if(!body.first_name || !body.last_name || !body.email || !body.gender){
        return res.status(400).json({msg:"All field are req..."});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    return res.status(200).json({status:"Success"});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,  
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUserById,
}