const conversationController = require('../controllers/conversationController');
const express = require('express');
const conversationRoutes = express.Router();

conversationRoutes.post('/create', conversationController.create)
conversationRoutes.get('/getconvos', conversationController.getConvos)
conversationRoutes.post('/messages', conversationController.findMessages)
conversationRoutes.post('/respond', conversationController.respond)
conversationRoutes.post('/users', conversationController.getUsers)



module.exports = conversationRoutes;