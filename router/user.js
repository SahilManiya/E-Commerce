const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController');
const User = require('../models/User');
const passport = require('passport');

routes.get('/',UserController.user_home);

routes.get('/categoryData/:cid/:sid/:eid',UserController.categoryData);

routes.get('/Product_Page/:id',UserController.Product_Page);

routes.get('/user_login',UserController.user_login);

routes.post('/register',UserController.register);

routes.post('/login',passport.authenticate('user',{failureRedirect:"/login"}),UserController.login);

routes.get('/cart/:productid/:userid',UserController.addtoCart);

routes.get('/removeProduct/:id',UserController.removeProduct);

routes.get('/view_cart/:id',passport.checkUserAthuntication,UserController.view_cart);

routes.get('/google',
  passport.authenticate('google', { scope: ['profile','email']}));

  routes.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    return res.redirect('/');
  });
 
module.exports = routes;