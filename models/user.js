const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique : true
    },
    accessType : {
        type : String,
        required : true
    },
    firstName : String,
    lastName : String,
    phone : Number,
    address : String,
    photo : String,
    town : String,
    //Student fields only
    age : Number,
    level : Number,
    state : Boolean,
    interests : [String],
    //coach fields only
    specialities : [String],
    category : String,
    availability : Boolean,
    rate : [Number],
    duration: Number, 
    available : Boolean,
    price : Number,
    specialities : [String],
    cv : String,
    timeTable : {
        days : [String],
        startHour : String,
        lastHour : String,
    } 
})

module.exports = mongoose.model('User', userSchema)
