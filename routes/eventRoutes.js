const eventController = require('../controllers/eventController');
const express = require('express');
const eventRoutes = express.Router();


eventRoutes.post('/create', eventController.create)
eventRoutes.get('/all', eventController.getAll)
eventRoutes.post('/save', eventController.save)
eventRoutes.get('/:eventId', eventController.getOne)

module.exports = eventRoutes;