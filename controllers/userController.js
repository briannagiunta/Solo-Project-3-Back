require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')

const userController = {}

userController.signUp = async (req, res) => {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.Password, 10)
      const u = await models.user.create({
        name: req.body.Name,
        email: req.body.Email,
        password: hashedPassword,
        zip: req.body.Zipcode,
        hereFor: req.body.HereFor

      })
      const encryptedId = jwt.sign({ userId: u.id }, process.env.JWT_SECRET)
      const user = {id: encryptedId, name: u.name, email: u.email, zip: u.zip, hereFor: u.hereFor}
      res.json({message: 'Signed up', user: user})
    } catch (error) {
        res.json({error})
    //   res.status(400)
    //   res.json({ error: 'You used that email already, silly.' })
    }
}

userController.login = async (req, res) => {
    try {
      const u = await models.user.findOne({
        where: {
          email: req.body.Email
        }
      })
      if (bcrypt.compareSync(req.body.Password, u.password)) {
        const encryptedId = jwt.sign({ userId: u.id }, process.env.JWT_SECRET)
        const user = {id: encryptedId, name: u.name, email: u.email, zip: u.zip, hereFor: u.hereFor}
        res.json({message: 'login successful', user: user })
      }else{
        res.status(401)
        res.json({ error: 'Password is incorrect' })
      }
    } catch (error) {
      res.status(400)
      res.json({ error: 'login failed' })
    }
}

userController.getUser = async(req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const u = await models.user.findOne({where:{
        id: decryptedId.userId
      }})
      if(u){
        const user = {id: req.headers.authorization, name: u.name, email: u.email, zip: u.zip, hereFor: u.hereFor}
        res.json({message: 'found user', user: user})
      }
      else{
        res.status(404).json({ message: 'user not found' })
      }
    } catch (error) {
        res.json({error})
    }
}

userController.getAll = async (req,res) => {
    try {
        const allUsers = await models.user.findAll()
        res.json({allUsers})
    } catch (error) {
        res.json({error})
    }
}

userController.userPosts = async(req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
        id: decryptedId.userId
      }})

      if(user){
        const posts = await user.getPosts()
        res.json({posts})
      }else{
        res.status(404).json({ message: 'user not found' })
      }
    } catch (error) {
        res.json({error})
    }
}

userController.savedEvents = async (req,res) =>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const events = await models.userEvent.findAll({where:{
            userId: decryptedId.userId
        }})
        res.json({events})
        
    } catch (error) {
        res.json({error})
    }
}
userController.savedJobs = async (req,res) =>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const jobs = await models.userJob.findAll({where:{
            userId: decryptedId.userId
        }})
        res.json({jobs})
        
    } catch (error) {
        res.json({error})
    }
}

userController.addedEvents = async (req,res) =>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
        id: decryptedId.userId
      }})

        const events = await user.getEvents()
        res.json({events})
    } catch (error) {
        res.json({error})
    }
}
userController.addedJobs = async (req,res) =>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
        id: decryptedId.userId
      }})

        const jobs = await user.getJobs()
        res.json({jobs})
    } catch (error) {
        res.json({error})
    }
}
 userController.getByZip = async (req,res) =>{
    try {
        const users = await models.user.findAll({where:{
            zip: req.body.zip
        }})
        res.json({users})
    } catch (error) {
        console.log(error);
        res.json({error})
    }
 }


module.exports = userController;