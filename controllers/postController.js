require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')

const postController = {}

postController.getAll = async (req,res) => {
    try {
        const allPosts = await models.post.findAll()
        res.json({allPosts})
    } catch (error) {
        res.json({error})
    }
}

postController.create = async (req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
            id: decryptedId.userId,
        }})
        const newPost = await models.post.create({
            title: req.body.Title,
            description: req.body.Description
        })
        await user.addPost(newPost)
        await newPost.reload()
        res.json({message: 'post added', newPost})
    } catch (error) {
      res.json({error})
    }
}

postController.getUser = async (req,res) => {
    try {
        const post = await models.post.findOne({where:{
            id: req.body.id
        }})
        const user = await post.getUser()
        res.json({user})

    } catch (error) {
        res.json({error})
    }
}



module.exports = postController;