const express = require("express");

const app = express.Router();
const {handleGetAllUsers, handleGetUserById,handleUpdateUserById,handleDeleteUserById, handleCreateUserById} = require("../controller/user")

app.route("/").get(handleGetAllUsers).post(handleCreateUserById);

app.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)


module.exports = app