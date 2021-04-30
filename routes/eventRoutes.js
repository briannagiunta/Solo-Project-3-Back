const eventController = require('../controllers/eventController');
const express = require('express');
const eventRoutes = express.Router();


eventRoutes.post('/create', eventController.create)

module.exports = eventRoutes;