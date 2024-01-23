const express = require('express');
const routes = express.Router();
const SubcategoryController = require('../controllers/SubcategoryController');

routes.get('/add_subcategory',SubcategoryController.add_subcategory);

routes.post('/insertSubcategoryData',SubcategoryController.insertSubcategoryData);

routes.get('/view_subcategory',SubcategoryController.view_subcategory);

routes.get('/update/:id',SubcategoryController.update);

routes.post('/editSubcategoryData',SubcategoryController.editSubcategoryData);

routes.get('/isactive/:id',SubcategoryController.isactive);

routes.get('/deactive/:id',SubcategoryController.deactive);

module.exports = routes;