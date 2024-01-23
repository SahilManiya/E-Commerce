const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');

module.exports.add_extracategory = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        return res.render('add_extracategory',{
            CatData : CatData,
            SubcatData : SubcatData
        });
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.insertExtracategoryData = async(req,res)=>{
    try {
        req.body.isActive = true;
        req.body.current_date = new Date().toLocaleString();
        req.body.update_date = new Date().toLocaleString();
        await Extracategory.create(req.body);
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.view_extracategory = async(req,res)=>{
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
        let data = await Extracategory.find({
            $or : [
                {"extracategory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page)
        .populate('category')
        .populate('subcategory').exec();
        let totalExcatData = await Extracategory.find({
            $or : [
                {"extracategory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render('view_extracategory',{
            ExcatData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalExcatData/perPage),
            curentPage : page
        });  
    } 
    catch (error) {
        console.log("Hii");
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.isactive = async(req,res)=>{
    try {
        if(req.params.id){
            let data = await Extracategory.findByIdAndUpdate(req.params.id,{isActive:false});
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
            let data = await Extracategory.findByIdAndUpdate(req.params.id,{isActive:true});
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
        let ExcatData = await Extracategory.findById(req.params.id);
        return res.render('update_extracategory',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExtracategoryData : ExcatData
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editExtracateoryData = async(req,res)=>{
    try {
        let updateData = await Extracategory.findByIdAndUpdate(req.body.EditId,req.body);
        if(updateData){
            console.log("Extra Category Update Successfully");
            return res.redirect('/admin/extracategory/view_extracategory');
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

module.exports.getSubcatData = async(req,res)=>{
    try {
        let SubcategoryData = await Subcategory.find({category:req.body.cateGoryId});
        var optionData = `<option value="">- - Select Subcategory- -</option>`;
        SubcategoryData.map((v,i)=>{
            optionData += `<option value="${v.id}">${v.subcategory}</option>`;
        })
        return res.json(optionData);
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}