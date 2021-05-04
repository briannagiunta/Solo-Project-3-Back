const friendshipController = require('../controllers/friendshipController');
const express = require('express');
const friendshipRoutes = express.Router();

friendshipRoutes.post('/send/request', friendshipController.sendRequest)
friendshipRoutes.get('/sent/pending', friendshipController.getPendingSent)
friendshipRoutes.get('/recieved/pending', friendshipController.getPendingRecieved)
friendshipRoutes.get('/friends', friendshipController.getFriends)
friendshipRoutes.post('/accept', friendshipController.acceptRequest)
friendshipRoutes.delete('/reject', friendshipController.deleteFriend)


module.exports = friendshipRoutes;