const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const User = require('../models/User');

module.exports.user_home = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        return res.render('user_panel/user_home',{ 
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            cartdata : cartData,
            cartpendingData : cartPendingData
        });
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.categoryData = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let productData = await Product.find({category:req.params.cid,subcategory:req.params.sid,extracategory:req.params.eid});
        let ProDetails = await Product.find(req.params.id);
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        return res.render('user_panel/CategoryData',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            ProData : productData,
            ProDetails : ProDetails, 
            cartdata : cartData,
            cartpendingData : cartPendingData
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.Product_Page = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let ProData = await Product.find({});
        let ProDetails = await Product.findById(req.params.id);
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        console.log(ProDetails);
        return res.render('user_panel/Product_Page',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            ProData : ProData,
            ProDetails : ProDetails,
            cartdata : cartData,
            cartpendingData : cartPendingData 
        });
    } 
    catch (error) { 
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.user_login = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let ProData = await Product.find({});
        let ProDetails = await Product.findById(req.params.id);
        if(req.user){
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        return res.render('user_panel/user_login',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            ProData : ProData,
            ProDetails : ProDetails,
            cartdata : cartData,
            cartpendingData : cartPendingData
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.register = async(req,res)=>{
    try {
        let Checkmail = await User.findOne({email : req.body.email});
        if(Checkmail){
            console.log('Email ALready Exist');
            return res.redirect('back');
        }
        else{
            if(req.body.password == req.body.cpassword){
                req.body.isActive = true;
                req.body.currentDate = new Date().toLocaleString();
                req.body.updateDate = new Date().toLocaleString();
                req.body.role = 'user';
                let createuser = await User.create(req.body)
                if(createuser){
                    console.log('Register Succesfully');
                    return res.redirect('back');
                }
                else{
                    console.log('Something Wrong');
                    return res.redirect('back');
                }
            }
            else{
                console.log('Password & confirm Password are not match');
                return res.redirect('back');
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.login = async(req,res)=>{
    try{
        console.log("Login Successfully");
        return res.redirect('/');
    }
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.addtoCart = async(req,res)=>{
    try {
        let already = await Cart.findOne({userId: req.params.userid, productId : req.params.productid});
        if(already){
            console.log('Product Already into Cart');
        }
        else{
            const cartdata = {
                productId : req.params.productid,
                userId : req.params.userid,
                quantity : 1,
                status : 'pending',
                currentDate : new Date().toLocaleString(),
                updateDate : new Date().toLocaleString(),
            }
            // console.log(productId);
            let cart = await Cart.create(cartdata);
            if(cart){
                console.log('Add to Cart Succesfully');
                return res.redirect('back');
            }
            return res.redirect('back');
        }
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.removeProduct = async(req,res)=>{
    try {
        let deletData = await Cart.findByIdAndDelete(req.params.id);
        if(deletData){
            console.log("Cart Product Remove Successfully");
            return res.redirect('back');
        }
        else{
            console.log("Cart Product not Remove");
            return res.redirect('back'); 
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.view_cart = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let ProData = await Product.find({});
        let ProDetails = await Product.findById(req.params.id);
        let findCart  = await Cart.find({userId : req.params.id}).populate('productId').exec();
        // console.log(findCart.productId);
        // console.log(findCart);
        // console.log(ProData);
        if(req.user){ 
            var cartData = await Cart.find({userId : req.user.id, status : 'pending'}).countDocuments();
            var cartPendingData = await Cart.find({ userId: req.user.id, status: 'pending' }).populate('productId').exec();
        }
        if(findCart){
            return res.render('user_panel/view_cart',{
                CatData : CatData,
                SubcatData : SubcatData,
                ExcatData : ExcatData,
                ProData : ProData,
                ProDetails : ProDetails,
                cartdata : cartData,
                cartpendingData : cartPendingData,
                view_cart : findCart
            });
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');        
    }
}