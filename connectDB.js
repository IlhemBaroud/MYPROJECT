const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config({path:'./Config/.env'})
mongoose.connect(process.env.MONGO_URI, function(err){
    if(err) {
        console.error('Error while connecting to database')
    }
    else {
        console.log('Connected to database')
    }
})
