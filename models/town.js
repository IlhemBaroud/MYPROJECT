const mongoose = require("mongoose")
const townSchema = new mongoose.Schema({
    name : String
})

module.exports = mongoose.model('Town', townSchema )