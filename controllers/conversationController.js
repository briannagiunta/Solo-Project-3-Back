require('dotenv').config()
const jwt = require('jsonwebtoken')
const models = require('../models')

const conversationController = {}

conversationController.create = async (req,res) => {
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
            id: decryptedId.userId,
        }})
        const user2 = await models.user.findOne({where:{
            id: req.body.userId2
        }})
        const newConversation = await models.conversation.create({
            usernames: `${user2.name} & ${user.name}`
        })
        const newMessage = await models.message.create({
            content: req.body.content
        })
        await user.addConversation(newConversation)
        await user.addMessage(newMessage)
        await newConversation.addMessage(newMessage)
        await user2.addConversation(newConversation)
        await newConversation.reload()
        res.json({message: 'conversation added', newConversation})
    } catch (error) {
      res.json({error})
    }
}

conversationController.getConvos = async (req,res)=>{
    try {
        const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await models.user.findOne({where:{
        id: decryptedId.userId
      }})
        const convos = await user.getConversations()
        
        res.json({convos})
    } catch (error) {
        res.json({error})
    }
}
conversationController.findMessages = async (req,res)=>{
    try {
        // const convo = await models.conversation.findOne({where:{
        //     id: req.body.id
        // }})
        // const messages = await convo.getMessages()
        const messages = await models.message.findAll({where:{
            conversationId: req.body.id
        },
            include: models.user
        })
        res.json({messages})
    } catch (error) {
        res.json({error})
    }
}



module.exports = conversationController;