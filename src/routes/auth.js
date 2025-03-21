const express = require("express");
const authRouter = express.Router();
const jwt = require('jsonwebtoken'); //for jwttokens
const validator = require("validator"); //npm library for validations
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async(req, res) => {
    try {
        // Validation of data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        //   Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.json({ message: "User Added successfully!", data: savedUser });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});


authRouter.post("/login", async(req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) { throw new Error("password is not correct"); }


        const token = await jwt.sign({ _id: user._id }, "DEVTinder@1234hds", { expiresIn: "7d" });
        console.log(token);
        res.cookie("token", token);
        res.send("Login Successful!!");

    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
});

module.exports = authRouter;