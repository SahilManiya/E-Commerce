const express = require('express');
const path = require('path');
const routes = express.Router();
const AdminController = require('../controllers/AdminController');
const Admin = require('../models/Admin');
const passport = require('passport');

routes.get("/",async(req,res)=>{
    return res.render('login');
})

routes.post('/loginCheck',passport.authenticate('local',{failureRedirect:'/admin/'}),AdminController.loginCheck);

routes.get("/dashboard",passport.cheAuth,AdminController.dashboard);

routes.get('/add_admin',passport.cheAuth,AdminController.add_admin);

routes.post('/insertAdminData',Admin.uploadImage,AdminController.insertAdminData);

routes.get('/view_admin',passport.cheAuth,AdminController.view_admin);

routes.get('/isactive/:id',passport.cheAuth,AdminController.isactive);

routes.get('/deactive/:id',passport.cheAuth,AdminController.deactive);

routes.get('/delete/:id',passport.cheAuth,AdminController.delete);

routes.get('/update/:id',passport.cheAuth,AdminController.update);

routes.post('/editAdminData',Admin.uploadImage,AdminController.editAdminData);

routes.get('/checkMail',AdminController.checkMail);

routes.post('/mailCheck',AdminController.mailCheck);

routes.get('/send_otp',AdminController.send_otp);

routes.post('/verify_otp',AdminController.verify_otp);

routes.post('/check_newpassword',AdminController.check_newpassword);

routes.get('/profile',passport.cheAuth,AdminController.profile);

routes.get('/update_profile',passport.cheAuth,AdminController.update_profile);

routes.get('/changepassword',passport.cheAuth,AdminController.changepassword);

routes.post('/editPassword',passport.cheAuth,AdminController.editPassword);

// routes.post('/mailCheck',)

routes.get('/logout',async(req,res)=>{
    return res.redirect('/admin/');
})

routes.use('/category',passport.cheAuth,require('../router/category'));

routes.use('/subCategory',passport.cheAuth,require('../router/sub_category'));

routes.use('/extraCategory',passport.cheAuth,require('../router/extra_category'));

routes.use('/brand',passport.cheAuth,require('../router/brand'));

routes.use('/type',passport.cheAuth,require('../router/type'));

routes.use('/product',passport.cheAuth,require('../router/product'));

module.exports = routes;