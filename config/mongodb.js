const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/DarkPan');
const db = mongoose.connection;

db.once('open',function(err){
    if(err){
        console.log("DB not Connect");
    }
    console.log("DB Connected");
})

module.exports = db;