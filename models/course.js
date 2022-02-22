const { response } = require("express")
const mongoose = require("mongoose")

const Category = require('./category.js')

const courseSchema = new mongoose.Schema({
    label : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    }   
})

module.exports = mongoose.model('Course',  courseSchema)


