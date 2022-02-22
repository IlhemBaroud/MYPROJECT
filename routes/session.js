const express=require("express")
const mongoose=require("mongoose")
const router = express.Router()
const Session = require('../models/session')

// List all sessions of student
router.get('/', async (request, response)=>{

    try {
        const session = await Session.find(request.query)
        response.json(session)
      } 
    catch (error) {
        response.status(400).send({Error : "Error while fetching session"})
      }
})

// List all sessions of coach
router.get('/coach/:id', async(request, response)=>{
    const id = request.params.id
    try {
        const sessions = await Session.find({coach : id})
        response.json(session)
      } 
    catch (error) {
        response.status(400).send({Error : "Error while fetching session"})
      }
})

//Add new session
router.post('/add', (request, response)=>{
  const newSession = new Session(request.body)

  newSession.save()
  .then((session)=>response.send({Msg : "User added successfully", newSession}))
  .catch((err)=>response.status(501).send({Error : "Error while saving session"}))
} )

  router.delete("/delete/:id", async (request, response)=>{
    
    try {
        const session = await Session.findOneAndDelete({_id : request.params.id})
        response.send({Msg : "user deleted successfully", session})
      } 
    catch (error) {
        response.status(400).send({Error : "Error while removing session"})
      }
  })


module.exports = router