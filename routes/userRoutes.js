const userController = require('../controllers/userController');
const express = require('express');
const userRoutes = express.Router();


userRoutes.post('/signup', userController.signUp)
userRoutes.post('/login', userController.login)
userRoutes.get('/verify', userController.getUser)
userRoutes.get('/all', userController.getAll)


module.exports = userRoutes;