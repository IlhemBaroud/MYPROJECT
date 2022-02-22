const { default: formatDistanceToNow } = require("date-fns/formatDistanceToNow/index.js")
const mongoose = require("mongoose")
const user= require("./user.js")
const now=Date.now()
//const moment=require("moment")
// const {format}=require("date-fns")
const agendaSchema = mongoose.Schema(
    {
    title : String,
    start :  {
        type: Date,
        default: now
        },
    end : {
        type: Date,
        default:now
        },
    coach: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
        },
        color:String



})

module.exports = mongoose.model('Agenda', agendaSchema)