const mongoose = require("mongoose")
const Course = require('./course')
const User = require('./user')

const sessionSchema = mongoose.Schema({
    startDate : {
        type : String,
        //required : true,
        //default: Date.now()
    },
    lastDate : {
        type : String,
        //required : true,
        //default : Date.now()+24
    },
    startHour : Number,
    lastHour : Number,
    meetingPlace : String,
    meetingLink : String,
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    },
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    coach : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Session',  sessionSchema)