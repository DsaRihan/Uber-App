const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const app = express();
const cors = require("cors")  //This middleware allows your backend to accept requests from different origins 
const db = require("./db/database");
db();

app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello world");
})

module.exports = app;
