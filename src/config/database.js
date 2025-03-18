const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://admin:*******@cluster0.dx50s.mongodb.net/")
};

module.exports = connectDB;
