require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../models')

const commentController = {}

commentController.create = async (req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const newComment = await models.comment.create({
            userId: decryptedId.userId,
            postId: req.body.postId,
            description: req.body.description
        })
        res.json({message: 'comment added', newComment})
    } catch (error) {
      res.json({error})
    }
}



module.exports = commentController;