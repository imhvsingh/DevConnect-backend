const express = require("express");

const app = express();

//app.use("/route", rH, [rH2, rH3], rH4, rH5);
app.get("/user", (req, res, next) => {
        console.log("Handling the route user!");
        next();
    },

    (req, res, next) => {
        console.log("Handling the route user 2!");
        next();
    },

    (req, res, next) => {
        console.log("Handling the route user 3!");
        next();
    },

    (req, res, next) => {
        console.log("Handling the route user 4!");
        next();
    },

    (req, res, next) => {
        console.log("Handling the route user 5!");
        res.send("5th Response!!");
    }
);

app.listen(7777, () => {
    console.log("Server is running on port 7777...");
});