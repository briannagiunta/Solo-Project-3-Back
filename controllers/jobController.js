require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')

const jobController = {}

jobController.create = async (req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
            id: decryptedId.userId,
        }})
        const newJob = await models.job.create({
            title: req.body.Title,
            description: req.body.Description,
            type: req.body.Type,
            city: req.body.City,
            state: req.body.State
        })
        await user.addJob(newJob)
        await newJob.reload()
        res.json({message: 'Job added', newJob})
    } catch (error) {
      res.json({error})
    }
}



module.exports = jobController;