const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes 
app.get("/api/users", (req,res)=>{
    return res.json(users)

});

app.get("/users",(req,res)=>{
    const html = `<ul> 
    ${users.map((user)=>`<li>${user.first_name}</li>`)}
     </ul>`;
     res.send(html)      
});


app.route("/api/users").get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id);
    return res.json(user)
}).patch((req,res)=>{
    return res.json({status:"panding"})
})

// app.get("/api/users/:id",(req, res)=>{
//     const id = Number(req.params.id)
//     const user = users.find((user)=> user.id === id);
//     return res.json(user)
// });


app.post("/api/users",(req,res)=>{
    const body = req.body;
    newUser = ({...body, id: users.length + 1 });
    users.push(newUser)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err, data)=>{
        return res.status(201).json({status: "success", id: users.length })
    })
});

// app.put("/api/users/:id",(req,res)=>{
//     return res.json({status:"panding"})
// })

// app.patch("/api/users/:id",(req,res)=>{
//     return res.json({status:"panding"})
// });

// app.delete("/api/users/:id",(req,res)=>{
//     return res.json({status:"panding"})
// });


app.listen(3000, ()=> console.log("Server started at program"))
