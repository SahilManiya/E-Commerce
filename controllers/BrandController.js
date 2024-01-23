const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');
const Brand = require('../models/Brand');

module.exports.add_brand = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        return res.render('add_brand',{
            CatData : CatData,
            SubcatData :SubcatData,
            ExcatData : ExcatData
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.insertBrandData = async(req,res)=>{
    try {
        req.body.isActive = true;
        req.body.current_date = new Date().toLocaleString();
        req.body.update_date = new Date().toLocaleString();
        await Brand.create(req.body);
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.view_brand = async(req,res)=>{
    try {
        let search = '';
        if(req.query.search){
            search = req.query.search;
        }
        if(req.query.page){
            page = req.query.page;
        }
        else{
            page = 0;
        }
        var perPage = 6;
        let data = await Brand.find({
            $or : [
                {"brand" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page)
        .populate(['category','subcategory','extracategory']).exec();
        let totalBrandData = await Brand.find({
            $or : [
                {"brand" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render('view_brand',{
            BrandData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalBrandData/perPage),
            curentPage : page
        });  
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.isactive = async(req,res)=>{
    try {
        if(req.params.id){
            let data = await Brand.findByIdAndUpdate(req.params.id,{isActive:false});
            if(data){
                console.log("Record Deactive Successfully");
                return res.redirect('back');
            }
            else{
                console.log("Record Not Deactive");
                return res.redirect('back');
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.deactive = async(req,res)=>{
    try {
        if(req.params.id){
            let data = await Brand.findByIdAndUpdate(req.params.id,{isActive:true});
            if(data){
                console.log("Record Active Successfully");
                return res.redirect('back');
            }
            else{
                console.log("Record Not Active");
                return res.redirect('back');
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.update = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let data = await Brand.findById(req.params.id);
        return res.render('update_brand',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            BrandData : data
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editBrandData = async(req,res)=>{
    try {
        let updateData = await Brand.findByIdAndUpdate(req.body.EditId,req.body);
        if(updateData){
            console.log("Brand Update Successfully");
            return res.redirect('/admin/brand/view_brand');
        }
        else{
            console.log("Data not Update");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.getExcatData = async(req,res)=>{
    try {
        let ExcategoryData = await Extracategory.find({category:req.body.cateGoryId,subcategory:req.body.subcateGoryId});
        var optionData = `<option value="">- - Select Extracategory- -</option>`;
        ExcategoryData.map((v,i)=>{
            optionData += `<option value="${v.id}">${v.extracategory}</option>`;
        })
        return res.json(optionData);
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}