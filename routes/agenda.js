const { response } = require("express");
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const auth =require('../middlewares/auth')
const Agenda=require('../models/agenda')
const moment=require("moment")

router.get('/:id', async (request, response)=>{
    try{
        const agenda = await Agenda.find({coach:request.params.id})
        if(!agenda)
            return response.send({Msg : "No events for this coach"})
        response.send({Msg : "Planning ", agenda})
    }
    catch(error){
        response.status(400).send({Error : "Error while fetching event"})
    }

})

router.post('/add', async (request, response)=>{
    
    try {
      const newAgenda = new Agenda(request.body)

      await newAgenda.save()
      const agenda=await Agenda.find()
      response.send({Msg : "Event added successfully", newAgenda, agenda})
    } 
    catch (error) {
      response.status(501).send({Error : "Error while saving event"})
    } 
  })
  
  router.delete("/delete/:id", async (request, response)=>{

    try {
        const event = await Agenda.findOneAndDelete
        ({_id : mongoose.Types.ObjectId(request.params.id)})
        const agenda= await Agenda.find()
        response.send({Msg : "Event deleted successfully", event,agenda})
      } 
    catch (error) {
        response.status(400).send({Error : "Error while removing event"})
      }
  })  
  
  router.put('/update/:id', async (request, response)=>{
    
    try {
        const event = await Agenda.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId(request.params.id)}, {...request.body,
            startDate : request.body.startDate,
            endDate : request.body.endDate},
          {new : true})
        const agenda = await Agenda.find()
        response.send({Msg : "Planning updated successfully", event, agenda})

      } 
    catch (error) {
        response.status(400).send({Error : "Error while updating planning"})
      }
  })
module.exports = router