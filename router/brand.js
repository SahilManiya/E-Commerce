const express = require('express');
const routes = express.Router();
const BrandController = require('../controllers/BrandController');

routes.get('/add_brand',BrandController.add_brand);

routes.post('/insertBrandData',BrandController.insertBrandData);

routes.get('/view_brand',BrandController.view_brand);

routes.post('/getExcatData',BrandController.getExcatData);

routes.get('/update/:id',BrandController.update);

routes.post('/editBrandData',BrandController.editBrandData);

routes.get('/isactive/:id',BrandController.isactive);

routes.get('/deactive/:id',BrandController.deactive);

module.exports = routes;