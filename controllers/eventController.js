require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')


const eventController = {}

eventController.create = async (req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
            id: decryptedId.userId,
        }})
        const newEvent = await models.event.create({
            title: req.body.Title,
            description: req.body.Description,
            type: req.body.Type,
            date: req.body.Date,
            start: req.body.Start,
            end: req.body.End,
            address: req.body.Address,
            zip: req.body.Zipcode
        })
        await user.addEvent(newEvent)
        await newEvent.reload()
        res.json({message: 'Event added', newEvent})
    } catch (error) {
      res.json({error})
    }
}
eventController.getAll = async (req,res) => {
    try {
        const allEvents = await models.event.findAll()
        res.json({allEvents})
    } catch (error) {
        res.json({error})
    }
}

eventController.getOne = async (req,res) =>{
    try {
        const event = await models.event.findOne({where:{
            id:req.params.eventId
        }})
        res.json({event})
    } catch (error) {
        res.json({error})
    }
}

eventController.save = async (req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
            id: decryptedId.userId,
        }})
        const event = await models.event.findOne({where:{
            id: req.body.eventId
        }})

        const savedEvent = await event.addUser(user)
        res.json({message: 'event saved', savedEvent})
    } catch (error) {
        res.json({error})
        
    }
}



module.exports = eventController;