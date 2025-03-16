const express = require("express");

const app = express();

//This will only match the GET HTTP method API calls to /user
app.get("/user", (req, res) => {
    res.send({ firstName: "Harsh", lastName: "singh" });
});

app.post("/user", (req, res) => {
    //Save user data to the database
    res.send("User data saved successfully!");
});

app.delete("/user", (req, res) => {
    //Delete user data from the database
    res.send("User data deleted successfully!");
});

//This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
    res.send("namaste from the server!");
});

app.listen(7777, () => {
    console.log("Server is running on port 7777...");
});