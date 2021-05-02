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
        const newJob = await models.job.findOrCreate({where:{
            title: req.body.Title,
            description: req.body.Description,
            type: req.body.Type,
            zip: req.body.Zipcode
        }
        })
        await user.addJob(newJob[0])
        await newJob[0].reload()
        res.json({message: 'Job added', newJob})
    } catch (error) {
      res.json({error})
    }
}
jobController.getAll = async (req,res) => {
    try {
        const allJobs = await models.job.findAll()
        res.json({allJobs})
    } catch (error) {
        res.json({error})
    }
}



module.exports = jobController;