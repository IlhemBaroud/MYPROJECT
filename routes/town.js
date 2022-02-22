const express = require("express")
const router=express.Router()
const Town=require('../models/town')


// List all caterories
router.get('/', async (request, response)=>{

    try { 
        const towns = await Town.find()
        response.send({Msg : "List of towns", towns})
    }
    catch (error) {
        response.send(error)
    }
})

// Add town
router.post('/add', async (request, response)=>{
    try{
        const newTown = new Town(request.body)
        await newTown.save()
        const town=Town.find()
        response.send({Msg:"New town added successfully", newTown, Towns})
    }
    catch(error) {
        response.send(error)
    }
    
})

// Delete a category
router.delete('/delete/:id', async (request, response)=>{
    
    try{
        const town = await Town.findOneAndDelete({_id : request.params.id})
        const towns=Town.find()
        response.send({Msg:"Town successfully deleted", town, towns})
    }
    catch (error) {
        response.send(error)}
})

// Update a category
router.put('/update/:id', async (request, response)=>{

    try {
        const town = await Town.findOneAndUpdate({_id : request.params.id}, 
        request.body, {new : true})
        response.send({Msg:"Town successfully updated", town})
    }
    catch (error) {
        request.send(error)
    }
})


module.exports = router
