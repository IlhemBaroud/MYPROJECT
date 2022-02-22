const express = require("express")
const router=express.Router()
const Category=require('../models/category')
const Course = require('../models/course')


// List all caterories
router.get('/', async (request, response)=>{

    try { 
        const categories = await Category.find()
        response.send({Msg : "List of categories", categories})
    }
    catch (error) {
        response.send(error)
    }
})

router.get('/:id', async (request, response)=>{

    try { 
        const category = await Category.findOne({_id: request.params.id})

        response.send({Msg : "Category found", category})
    }
    catch (error) {
        response.send(error)
    }
})
// Add category
router.post('/add', async (request, response)=>{
    try{
        const newCategory = new Category(request.body)
        await newCategory.save()
        const categories=Category.find()
        response.send({Msg:"New category added successfully", newCategory, categories})
    }
    catch(error) {
        response.send(error)
    }
    
})

// Delete a category
router.delete('/delete/:id', async (request, response)=>{
    
    try{
        const category = await Category.findOneAndDelete({_id : request.params.id})
        const categories=Category.find()
        response.send({Msg:"Category successfully deleted", category, categories})
    }
    catch (error) {
        response.send(error)}
})

// Update a category
router.put('/update/:id', async (request, response)=>{

    try {
        const category = await Category.findOneAndUpdate({_id : request.params.id}, 
        request.body, {new : true})
        response.send({Msg:"Category successfully updated", category})
    }
    catch (error) {
        request.send(error)
    }
})


module.exports = router
