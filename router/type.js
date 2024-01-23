const express = require('express');
const routes = express.Router();
const TypeController = require('../controllers/TypeController');

routes.get('/add_type',TypeController.add_type);

routes.post('/insertTypeData',TypeController.insertTypeData);

routes.get('/view_type',TypeController.view_type);

routes.post('/getBrData',TypeController.getBrData);

routes.get('/update/:id',TypeController.update);

routes.post('/editTypeData',TypeController.editTypeData);

routes.get('/isactive/:id',TypeController.isactive);

routes.get('/deactive/:id',TypeController.deactive);

module.exports = routes;