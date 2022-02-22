const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dotenv = require("dotenv")
const env = dotenv.config({path : './Config/.env'})

const auth = async (request, response, next)=>{

    const token = request.header('x-auth-token')
    if (!token) {
        return response.status(401).send({Msg : "No token. Authorisation denied!"})
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_ALL_KEY)
        request.user = payload
        next();
        if (!user) {
            return response.send({Msg : "Authorisation denied"})
        }
    }
    catch(error) {
        response.status(400).send({Msg : "Invalid token"})

    }
}

module.exports = auth