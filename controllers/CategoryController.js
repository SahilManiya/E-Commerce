const Category = require('../models/Category');

module.exports.add_category = async(req,res)=>{
    try{
        return res.render('add_category');
    }
    catch(error){
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.insertCategoryData = async(req,res)=>{
    try {
        if(req.body){
            req.body.isActive = true;
            req.body.current_date = new Date().toLocaleString();
            req.body.update_date = new Date().toLocaleString();
            await Category.create(req.body);
            return res.redirect('back');
        }
        else{
            console.log("Something Wrong");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.view_category = async(req,res)=>{
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
        let data = await Category.find({
            $or : [
                {"category" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page);
        
        let totalCatData = await Category.find({
            $or : [
                {"category" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render('view_category',{
            CatData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalCatData/perPage),
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
            let data = await Category.findByIdAndUpdate(req.params.id,{isActive:false});
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
            let data = await Category.findByIdAndUpdate(req.params.id,{isActive:true});
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
        let data = await Category.findById(req.params.id);
        return res.render('update_category',{
            CategoryData : data
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editCategoryData = async(req,res)=>{
    try {
        let updateData = await Category.findByIdAndUpdate(req.body.EditId,req.body);
        if(updateData){
            console.log("Category Update Successfully");
            return res.redirect('/admin/category/view_category');
        }
        else{
            console.log("Category not Update");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}