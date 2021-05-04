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

jobController.getOne = async (req,res) =>{
    try {
        const job = await models.job.findOne({where:{
            id:req.params.jobId
        }})
        res.json({job})
    } catch (error) {
        res.json({error})
    }
}

jobController.save = async (req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
            id: decryptedId.userId,
        }})
        const job = await models.job.findOne({where:{
            id: req.body.jobId
        }})

        const savedJob = await job.addUser(user)
        res.json({message: 'job saved', savedJob})
    } catch (error) {
        res.json({error})
        
    }
}



module.exports = jobController;