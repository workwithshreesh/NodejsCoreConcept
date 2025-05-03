const express = require("express");
const { HandleSignupPage,HandleLoginPage } = require("../controller/users")


const router = express.Router()

router.post("/signup", HandleSignupPage);
router.post("/login",HandleLoginPage);


module.exports = router