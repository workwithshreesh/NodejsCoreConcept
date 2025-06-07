const express = require("express");
require('dotenv').config();
const cors = require('cors');
const routerMail = require("./route")


const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/mail',routerMail);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server is started... on port", PORT))