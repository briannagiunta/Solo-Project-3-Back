const postController = require('../controllers/postController');
const express = require('express');
const postRoutes = express.Router();


postRoutes.get('/all', postController.getAll)
postRoutes.post('/create', postController.create)


module.exports = postRoutes;