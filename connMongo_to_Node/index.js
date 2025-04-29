const express = require("express")
const fs = require("fs")
const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose")

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// connects
mongoose.connect("mongodb://103.54.183.140:49254/practice_trainee").then(()=>
console.log('MongoDB Connected')).catch((err)=>console.log("mongo error",err));

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
})

const User = mongoose.model('user',userSchema);

app.post("/api/users", async (req,res)=>{
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){

        return res.status(400).json({status:"failed", id: users.length})
    }
    try{

        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            gender: body.gender,
            jobTitle: body.job_title
        })
    
        return res.status(201).json({status:"success"})
    } catch(error){
        return res.status(500).json({status:"failed", message:error.message})
    }
});

app.get("/api/users",async (req,res)=>{
    const allDbUsers = await User.find({})
    const html = `
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;

    return res.send(html)
});

app.get("/api/users/:id", async (req,res)=>{
    const user = await User.findById(String(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
});

app.listen(3000,()=>console.log("Server started!!!"))