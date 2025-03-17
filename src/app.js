const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async(req, res) => {
    // creating a new instance of the User model
    const user = new User({
        firstName: "Virat",
        lastName: "kohli",
        emailId: "viratkohli@gmail.com",
        password: "virat@123"
    });

    await user.save();
    res.send("User added successfully");

});

connectDB().then(() => {
        console.log("Connected to the database...");
        app.listen(7777, () => {
            console.log("Server is running on port 7777...");
        });
    })
    .catch((err) => {
        console.log("Error connecting to the database...");
    });