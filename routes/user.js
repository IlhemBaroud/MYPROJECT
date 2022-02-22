const { response } = require("express");
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const auth =require('../middlewares/auth')
const nodemailer = require("nodemailer");

const User = require('../models/user')

//Get all users
router.get('/', async (request, response)=>{
    try {
        const users = await User.find().select('-password')
        response.send({Msg : "Users list", users})
      } 
    catch (error) {
        response.status(400).send({Error : "User not found! Please register"})
      }
})

//Look for one user
router.get('/finduser', async (request, response)=>{
  try {
      const users = await User.find(request.query)
      if (!users) {
        return response.json({message : "No users satisfy such search creteria!"})
      }
      else {
        response.json({message : "Users found ", users})
    } 
  }
  catch (error) {
      response.send({Error : "User not found! Please register"})
    }
})

// Find user per speciality
router.get('/finduserperspeciality/:speciality', async (request, response)=>{
  try {
      const users = await User.find({ specialities : request.params.speciality})
      if (!users) {
        return response.send({message : "No users satisfy such search creteria!"})
      }
      else {
        response.send({message : "Users found ", users})
    } 
  }
  catch (error) {
      response.send({Error : "User not found! Please register"})
    }
})

//Get user by _id

router.get('/:id', async (request, response)=>{
  try {
      const users = await User.findOne({_id:request.params.id})
      if (!users) {
        return response.send({message : "No such user regestered. Please register!"})
      }
      response.send({message:"User found", users})
    } 
  catch (error) {
      response.status(420).send({Error : "User not found! Please register"})
    }
})

  router.delete("/delete/:id", async (request, response)=>{

    try {
        const user = await User.findOneAndDelete
        
        ({_id : mongoose.Types.ObjectId(request.params.id)})
        response.send({Msg : "user deleted successfully", user})
        
      } 
    catch (error) {
        response.status(400).send({Error : "Error while removing user"})
        
      }
  })

  router.put('/update/:id', async (request, response)=>{
    
    try {
        const user = await User.findOneAndUpdate({_id : request.params.id}, request.body,
          {new : true})
        response.send({Msg : "User updated successfully", user})

      } 
    catch (error) {
        response.status(400).send({Error : "Error while updating user"})
      }
  })

  router.post('/mailing', (request, response)=>{

    let transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth: {
          user : 'ilhem.baroud21@gmail.com', // generated ethereal user
          pass: 'bingoo8974', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
      }
    });
  
    // send mail with defined transport object
    // var mailOptions = {
    //   from: 'everyCoaching@gmail.com', // sender address
    //   to: `${request.body.email}`, // list of receivers
    //   subject: "Registration forward", // Subject line
    //   text: "Request accepted", // plain text body
    //   html: "Your membership to EveryCoachin request was accepted.", // html body
    // }
    var mailOptions = {
      from: 'everyCoaching@gmail.com', // sender address
      to: `${request.body.email}`, // list of receivers
      subject: `${request.body.subject}`, // Subject line
      text: "EveryCoaching", // plain text body
      html: `${request.body.html}`, // html body
    }
    transporter.sendMail(mailOptions,(error)=>{
        if(error) {
            return console.log(error)
        } 
    response.send({msg:'Email was sent'})
    }) 
})
  module.exports = router