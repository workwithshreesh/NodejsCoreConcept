const {HandleSignupPage, HandleLoginPage} = require("../controller/usersController");
const express = require("express");

const router = express.Router();


router.post("/signup",HandleSignupPage);
router.post("/login",HandleLoginPage)

module.exports = router;