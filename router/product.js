const express = require('express');
const routes = express.Router();
const Product = require('../models/Product');
const ProductController = require('../controllers/ProductController');

routes.get('/add_product',ProductController.add_product);

routes.post('/getTyData',ProductController.getTyData);

routes.post('/insertProductData',Product.uploadImage,ProductController.insertProductData);

routes.get('/view_product',ProductController.view_product);

routes.get('/isactive/:id',ProductController.isactive);

routes.get('/deactive/:id',ProductController.deactive);

routes.get('/delete/:id',ProductController.delete);

routes.get('/update/:id',ProductController.update);

routes.post('/editProductData',Product.uploadImage,ProductController.editProductData);

routes.get('/view_more/:id',ProductController.view_more);

routes.post('/deleteimg',ProductController.deleteimg);

routes.get('/editimg',ProductController.editimg);

routes.post('/insert_img',Product.uploadImage,ProductController.insert_img);

module.exports = routes;