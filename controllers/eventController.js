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



module.exports = eventController;