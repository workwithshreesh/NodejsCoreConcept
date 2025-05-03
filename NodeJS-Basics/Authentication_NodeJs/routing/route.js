const express = require("express");
const router = express.Router();
const { HandleSignup, HandleHomePageAll, OpenLoginPage,HandleLoginPage } = require("../controller/usersController")
const { restrictToLoggedinUserOnly } = require("../middleware/auth")

router.post("/signup",HandleSignup)
router.post("/login",HandleLoginPage)
router.get("/home", restrictToLoggedinUserOnly, HandleHomePageAll)

module.exports = router;