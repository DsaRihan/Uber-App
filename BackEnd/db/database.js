const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT).then(
        ()=>{console.log("connected To Db")}
    );
}

module.exports = connectToDb;