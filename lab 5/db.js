const mongoose = require("mongoose");
function connectDB(uri){
    mongoose.connect(uri).then(()=>{
        console.log("db connected successfully");
    }).catch((err)=>{
        console.log(`something error ${err.message}`)
    })
}

module.exports = connectDB;
