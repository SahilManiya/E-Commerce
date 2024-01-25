const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');
const Product = require('../models/Product');

module.exports.user_home = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        return res.render('user_panel/user_home',{ 
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData
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
        return res.render('user_panel/CategoryData',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            ProData : productData,
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
        console.log(ProDetails);
        return res.render('user_panel/Product_Page',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            ProData : ProData,
            ProDetails : ProDetails
        });
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}