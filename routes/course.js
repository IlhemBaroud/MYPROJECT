const express=require("express")
const mongoose=require("mongoose")
const router = express.Router()
const Course = require('../models/course')
const Category = require('../models/category')
// const { findOneAndUpdate } = require("../models/category")
// , firstName, lastName, phone,
//   address, photo, speciality, availability, rate, state, startDay, lastDay, startHour, 
//   lastHour

// List all courses
router.get('/', async (request, response)=>{
    try {
        const courses = await Course.find().populate('category')
        response.send({msg : "Courses list :", courses})
      } 
    catch (error) {
        response.status(400).send({Error : "Error while fetching courses"})
      }
})

// Search a course
router.get('/:id', async (request, response)=>{
  const id = request.params
  try {
      const course = await Course.findOne({_id : mongoose.Types.ObjectId(id)}).
      populate('category')
      response.json(course)
    } 
  catch (error) {
      response.status(400).send({Error : "Error while fetching course"})
    }
})
// Add a new course
router.post('/add', async(request, response)=>{
  const {label, categoryName} = request.body 
  try {
    const category = await Category.findOne({name : categoryName})
    const newCourse = new Course({label : label, category : category._id})
    newCourse.save()
    .then((courses)=>response.json({"Message" : "Course added successfully", newCourse}))
    .catch((err) => response.json("Error adding course"))
  }
  catch {
    response.status(401).send({Error : "Error while creationg course"})
  }
  
})


// Delete a course
router.delete('/delete/:id', async (request, response) =>{
  const id = request.params

  try {
    const course = await Course.findByIdAndDelete(mongoose.Types.ObjectId(id))
    response.send({Message : "Course deleted succssfully"})
  }

  catch(error) {
    console.log(error)
  }
})

//update a course
router.put('/update/:id', async (request, response) => {
  //const {label, category} = request.body
  const id = request.params
  const {label, categoryName} = request.body
  try {
    const category = await Category.findOne({name : categoryName})
    console.log(mongoose.Types.ObjectId(category._id))
    const course = await Course.findByIdAndUpdate(mongoose.Types.ObjectId(id), 
    {$set:{label : label, category : mongoose.Types.ObjectId(category._id)}})
    response.send({Message : "Course updated succssfully"})
  }
  catch(error) {
    console.log(error)
  }
} )

module.exports = router