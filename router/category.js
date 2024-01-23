const express = require('express');
const routes = express.Router();
const CategoryController = require('../controllers/CategoryController');

routes.get('/add_category',CategoryController.add_category);

routes.post('/insertCategoryData',CategoryController.insertCategoryData);

routes.get('/view_category',CategoryController.view_category);

routes.get('/update/:id',CategoryController.update);

routes.post('/editCategoryData',CategoryController.editCategoryData);

routes.get('/isactive/:id',CategoryController.isactive);

routes.get('/deactive/:id',CategoryController.deactive);

module.exports = routes;