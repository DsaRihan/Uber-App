const dotenv = require("dotenv");
dotenv.config();
const express = require("express")
const app = express();
const cors = require("cors")  //This middleware allows your backend to accept requests from different origins 
const db = require("./db/database");
db();
const userRoute = require("./routes/userroutes")
const cookieparser = require("cookie-parser");

app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello world");
})
app.use(express.json());
app.get('/users',userRoute)
app.use(cookieparser());

module.exports = app;
