const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');
const Brand = require('../models/Brand');
const Type = require('../models/Type');

module.exports.add_type = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let BrandData = await Brand.find({});
        return res.render('add_type',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            BrandData : BrandData
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.insertTypeData = async(req,res)=>{
    try {
        req.body.isActive = true;
        req.body.current_date = new Date().toLocaleString();
        req.body.update_date = new Date().toLocaleString();
        await Type.create(req.body);
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.view_type = async(req,res)=>{
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
        let data = await Type.find({
            $or : [
                {"type" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page)
        .populate('category')
        .populate('subcategory')
        .populate('extracategory')
        .populate('brand').exec();
        let totalTypeData = await Type.find({
            $or : [
                {"type" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render('view_type',{
            TypeData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalTypeData/perPage),
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
            let data = await Type.findByIdAndUpdate(req.params.id,{isActive:false});
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
            let data = await Type.findByIdAndUpdate(req.params.id,{isActive:true});
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
        let BrData = await Brand.find({});
        let data = await Type.findById(req.params.id);
        return res.render('update_type',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            BrData : BrData,
            TypeData : data
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.getBrData = async(req,res)=>{
    try {
        let BrandData = await Brand.find({category:req.body.cateGoryId,subcategory:req.body.subcateGoryId,extracategory:req.body.extracateGoryId});
        var optionData = `<option value="">- - Select Brand - -</option>`;
        BrandData.map((v,i)=>{
            optionData += `<option value="${v.id}">${v.brand}</option>`;
        })
        return res.json(optionData);
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editTypeData = async(req,res)=>{
    try {
        let updateData = await Type.findByIdAndUpdate(req.body.EditId,req.body);
        if(updateData){
            console.log("Type Update Successfully");
            return res.redirect('/admin/type/view_type');
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

