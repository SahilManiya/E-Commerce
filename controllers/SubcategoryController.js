const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

module.exports.add_subcategory = async(req,res)=>{
    try {
        var Catdata = await Category.find({});
        return res.render('add_subcategory',{
            CatData : Catdata
        });   
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.insertSubcategoryData = async(req,res)=>{
    try {
        req.body.isActive = true;
        req.body.current_date = new Date().toLocaleString();
        req.body.update_date = new Date().toLocaleString();
        await Subcategory.create(req.body);
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.view_subcategory = async(req,res)=>{
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
        let data = await Subcategory.find({
            $or : [
                {"subcategory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page)
        .populate('category').exec();
        let totalsubatData = await Subcategory.find({
            $or : [
                {"subcategory" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render('view_subcategory',{
            SubcatData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalsubatData/perPage),
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
            let data = await Subcategory.findByIdAndUpdate(req.params.id,{isActive:false});
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
            let data = await Subcategory.findByIdAndUpdate(req.params.id,{isActive:true});
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
        let data = await Subcategory.findById(req.params.id);
        console.log(data.category);
        return res.render('update_subcategory',{
            CatData : CatData,
            SubcategoryData : data
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editSubcategoryData = async(req,res)=>{
    try {
        let updateData = await Subcategory.findByIdAndUpdate(req.body.EditId,req.body);
        if(updateData){
            console.log('Subcategory Update Successfully');
            return res.redirect('/admin/subcategory/view_subcategory');
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