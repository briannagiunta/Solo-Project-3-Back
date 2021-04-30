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
        city: req.body.city,
        state: req.body.state,
        hereFor: req.body.hereFor

      })
      const encryptedId = jwt.sign({ userId: u.id }, process.env.JWT_SECRET)
      const user = {id: encryptedId, name: u.name, city: u.city, state: u.state, hereFor: u.hereFor}
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
        const user = {id: encryptedId, name: u.name, city: u.city, state: u.state, hereFor: u.hereFor}
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
        console.log(decryptedId);
        const u = await models.user.findOne({where:{
        id: decryptedId.userId
      }})
      if(u){
        const user = {id: req.headers.authorization, name: u.name, city: u.city, state: u.state, hereFor: u.hereFor}
        res.json({message: 'found user', user: user})
      }
      else{
        res.status(404).json({ message: 'user not found' })
      }
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



module.exports = userController;