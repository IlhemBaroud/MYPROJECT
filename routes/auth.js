const express = require("express")
const { models } = require("mongoose")
const router = express.Router()
const User = require('../models/user.js')
const dotenv = require('dotenv')
const env= dotenv.config({path:'../Config/.env'})
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth')
const {validator, registerRules, loginRules} = require('../middlewares/validator')

// Register new user
router.post('/register', registerRules(), validator, async (request, response)=>{

    try {

      let user = await User.findOne({email : request.body.email})
      if (user){
        return response.json({Msg : "User already exists"})
      }
      const salt = 10
      const hashedPassword = await bcrypt.hash(request.body.password,salt)    

      user = new User({...request.body, password:hashedPassword})
      
      await user.save()

      let payload = {
          user
      } 
      const token = jwt.sign(payload, process.env.SECRET_ALL_KEY, {
        expiresIn: '7 days',
      });

      response.send({Msg : "User successfully regitered", token, user})
       
    } 
    catch (error) {
      response.status(501).send({Msg : 'Oups! Registration failed !'})
    } 
  })
  
  //Look for one user
  router.post('/login', loginRules(), validator, async (req, res) => {
    const { email, password } = req.body;
    try {

      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).send({ Msg: 'Bad Credentials! email' });
      }
  
      //Check password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).send({ Msg: 'Bad Credentials! password' });
      }
  
      // sign user
      const payload = {
        user
      };
  
      // Generate token
      const token = await jwt.sign(payload, process.env.SECRET_ALL_KEY, {
        expiresIn: '7 days',
      });
  
      res.send({ Msg: 'Logged in with success', user, token });
    } catch (error) {
      res.status(500).send({ Msg: 'Oups! loggin failed !' });
    }
  });

  router.get('/user', auth, async (request, response)=>{
    response.send({user : request.user})
    });
    
  module.exports = router