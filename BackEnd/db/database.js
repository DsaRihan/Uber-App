const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

function connectToDb() {
    try {
        mongoose.connect(process.env.DB_URL, {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToDb;
