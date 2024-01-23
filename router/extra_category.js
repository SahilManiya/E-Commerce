const express = require('express');
const routes = express.Router();
const ExtracategoryController = require('../controllers/ExtracategoryController');

routes.get('/add_extracategory',ExtracategoryController.add_extracategory);

routes.post('/insertExtracategoryData',ExtracategoryController.insertExtracategoryData);

routes.get('/view_extracategory',ExtracategoryController.view_extracategory);

routes.post('/getSubcatData',ExtracategoryController.getSubcatData);

routes.get('/update/:id',ExtracategoryController.update);

routes.post('/editExtracateoryData',ExtracategoryController.editExtracateoryData);

routes.get('/isactive/:id',ExtracategoryController.isactive);

routes.get('/deactive/:id',ExtracategoryController.deactive);

module.exports = routes;