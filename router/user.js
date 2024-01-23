const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController');

routes.get('/',UserController.user_home);

routes.get('/categoryData/:cateGoryId/:subcateGoryId/:extracateGoryId',UserController.categoryData);

routes.get('/Product_Page/:id',UserController.Product_Page);

module.exports = routes;