const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async(req, res, next) => {

    try {

        const { token } = req.cookies;
        if (!token) {
            throw new Error("token is invalid....");
        }

        const decodedMessage = jwt.verify(token, "DEVTinder@1234hds");

        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        req.user = user;

        if (!user) {
            throw new Error("user does't exist");
        } else {
            next();
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
};

module.exports = {
    userAuth,
};