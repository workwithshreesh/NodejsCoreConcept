const { getUser } = require("../service/auth");
const cookieParser = require("cookie-parser");

async function restrictToLoggedinUserOnly(req, res, next) {
    // Use req.cookies to access cookies
    const userUid = req.cookies?.uid;

    // Redirect to login if no user UID cookie is found
    if (!userUid) {
        return res.redirect("/login");
    }

    // Fetch user data based on the UID
    const users = await getUser(userUid);

    // Redirect to login if no user is found
    if (!users) {
        return res.redirect("/login");
    }

    // Attach user data to the request object for use in the next middleware/route
    req.users = users;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
};
