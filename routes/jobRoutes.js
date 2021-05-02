const jobController = require('../controllers/jobController');
const express = require('express');
const jobRoutes = express.Router();

jobRoutes.post('/create', jobController.create)
jobRoutes.get('/all', jobController.getAll)

module.exports = jobRoutes;