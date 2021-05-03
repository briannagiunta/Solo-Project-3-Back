const userController = require('../controllers/userController');
const express = require('express');
const userRoutes = express.Router();


userRoutes.post('/signup', userController.signUp)
userRoutes.post('/login', userController.login)
userRoutes.get('/verify', userController.getUser)
userRoutes.get('/all', userController.getAll)
userRoutes.get('/events/saved', userController.savedEvents)
userRoutes.get('/jobs/saved', userController.savedJobs)
userRoutes.get('/events/added', userController.addedEvents)
userRoutes.get('/jobs/added', userController.addedJobs)
userRoutes.get('/posts', userController.userPosts)


module.exports = userRoutes;