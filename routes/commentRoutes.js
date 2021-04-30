const commentController = require('../controllers/commentController');
const express = require('express');
const commentRoutes = express.Router();


commentRoutes.post('/create', commentController.create)

module.exports = commentRoutes;