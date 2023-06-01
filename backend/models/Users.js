const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    }

});

const User = new mongoose.model('users',userSchema);

module.exports = User;