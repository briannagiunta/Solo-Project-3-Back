const jobController = require('../controllers/jobController');
const express = require('express');
const jobRoutes = express.Router();

jobRoutes.post('/create', jobController.create)

module.exports = jobRoutes;