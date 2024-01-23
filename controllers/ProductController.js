const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Extracategory = require('../models/Extracategory');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

module.exports.add_product = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let BrandData = await Brand.find({});
        let TypeData = await Type.find({});
        return res.render('add_product',{
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            BrandData : BrandData,
            TypeData : TypeData
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.insertProductData = async(req,res)=>{
    try {
        let singleimgPath = '';
        let multiimgPath = [];
        if(req.files){
            singleimgPath = await Product.singelImageModel+'/'+req.files.single_image[0].filename;
        }
        for(var i=0;i<req.files.multi_image.length;i++){
            multiimgPath.push(Product.multiImageModel+'/'+req.files.multi_image[i].filename);
        }
        req.body.single_image = singleimgPath;
        req.body.multi_image = multiimgPath;
        req.body.isActive = true;
        req.body.currentdate = new Date().toLocaleString();
        req.body.updatedate = new Date().toLocaleString();
        await Product.create(req.body);
        return res.redirect('back');
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.view_product = async(req,res)=>{
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
        let data = await Product.find({
            $or : [
                {"product" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        })
        .limit(perPage)
        .skip(perPage*page)
        .populate('category')
        .populate('subcategory')
        .populate('extracategory')
        .populate('brand')
        .populate('type').exec();
        let totalProductData = await Product.find({
            $or : [
                {"product" : {$regex:".*"+search+".*",$options:"i"}}
            ]
        }).countDocuments();
        return res.render('view_product',{
            ProductData : data,
            searchInput : search,
            totalDocument : Math.ceil(totalProductData/perPage),
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
            let data = await Product.findByIdAndUpdate(req.params.id,{isActive:false});
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
            let data = await Product.findByIdAndUpdate(req.params.id,{isActive:true});
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

module.exports.delete = async(req,res)=>{
    try {
        let data = await Product.findById(req.params.id);
        if(data.single_image){
            fullPath = path.join(__dirname,"..",data.single_image);
            fs.unlinkSync(fullPath);
        }
        for(var i=0;i<data.multi_image.length;i++){
            var multifullPath = path.join(__dirname,"..",data.multi_image[i]);
            try {
                await fs.unlinkSync(multifullPath);
            } 
            catch (error) {
                console.log(error);    
            }
        }
        let deleteData = await Product.findByIdAndDelete(req.params.id);
        if(deleteData){
            console.log("Record And Image Delete Successfully");
            return res.redirect('/admin/product/view_product');
        }
        else{
            console.log("Product Data not Delete");
            return res.redirect('back');
        }
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.getTyData = async(req,res)=>{
    try {
        let TypeData = await Type.find({category:req.body.cateGoryId,subcategory:req.body.subcateGoryId,extracategory:req.body.extracateGoryId,brand:req.body.BrandId});
        var optionData = `<option value="">- - Select Type - -</option>`;
        TypeData.map((v,i)=>{
            optionData += `<option value="${v.id}">${v.type}</option>`;
        })
        return res.json(optionData);
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.view_more = async(req,res)=>{
    try {
        let data = await Product.findById(req.params.id)
        .populate('category')
        .populate('subcategory')
        .populate('extracategory')
        .populate('brand')
        .populate('type').exec();
        return res.render('view_product_more',{
            data : data
        })
    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.deleteimg = async(req,res)=>{
    try {
      // console.log(req.body.img);
       var  productsdata = await Product.findById(req.body.id);
      
      var de = productsdata.multi_image.splice(req.body.i,1);
      //console.log(de);
        
        var fullPath =  path.join(__dirname,'..',req.body.img);
        //console.log(fullPath);
        //console.log(productsdata);
        await fs.unlinkSync(fullPath);
       var datas = await Product.findByIdAndUpdate(req.body.id,productsdata)
      // console.log(datas);
       if(datas) {
          console.log("Data Updated Successfully");
            return res.redirect('/admin/product/view_product');
        }
        else {
          console.log("Record Not Updated Successfully");
             return res.redirect('/admin/product/view_product');
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.editimg = (req,res)=>{
    // console.log(req.query.id);
    // console.log(req.query.i);
    // console.log(req.query.img);
    var id = req.query.id;
    var i = req.query.i1;
    var img = req.query.img;

    return res.render('update_img', {
        id:id,
        i:i,
        img:img
    })

}

module.exports.insert_img = async (req,res)=>{
    // console.log(req.body.id);
    // console.log(req.body.i);
    console.log(req.body.img);
    // console.log(req.files);
    // console.log(req.body);
     //console.log(req.files.multipleproductimage[0]);
     //console.log(req.files.multipleproductimage[0].filename);
     try {
        console.log(req.body.img);
        var id = req.body.id;
        var productsdata = await Product.findById(req.body.id);
        var newimgpath =''
        if(productsdata){
            newimgpath = Product.multiImageModel+"/"+req.files.multi_image[0].filename;
            var de = productsdata.multi_image.splice(req.body.i,1,newimgpath);
            var datas = await Product.findByIdAndUpdate(req.body.id,productsdata);
            if(datas) {
               console.log("Data Updated Successfully");
               return res.redirect(`/admin/product/view_more/${id}`);
             }
             else {
               console.log("Record Not Updated Successfully");
               return res.redirect(`/admin/product/view_more/${id}`);
             }
        }
        else{
            console.log('Product Not Found');
            return res.redirect(`/admin/product/view_more/${id}`);
        }
      }
      catch (err) {
          console.log(err);
          return res.redirect('back');
      }

}

module.exports.update = async(req,res)=>{
    try {
        let CatData = await Category.find({});
        let SubcatData = await Subcategory.find({});
        let ExcatData = await Extracategory.find({});
        let BrData = await Brand.find({});
        let TyData = await Type.find({});
        let data = await Product.findById(req.params.id);
        return res.render('update_product',{
            ProductData : data,
            CatData : CatData,
            SubcatData : SubcatData,
            ExcatData : ExcatData,
            BrData : BrData,
            TyData : TyData
        })

    } 
    catch (error) {
        console.log(error);
        return res.redirect('back');    
    }
}

module.exports.editProductData = async(req,res)=>{
    console.log(req.files);
    console.log(req.body);
    try {
        console.log(req.files.single_image);
        if (req.files.single_image) {
            let oldData = await Product.findById(req.body.EditId);
            if (oldData) {
                if (oldData.single_image) {
                    let fullPath = path.join(__dirname,'..',oldData.single_image);
                    await fs.unlinkSync(fullPath);
                }
                if(req.files.multi_image){
                    let multipleimg = [];
                    let oldpro = await Product.findById(req.body.EditId);
                     for(var j=0;j<oldpro.multi_image.length;j++){
                         var fullPath1 = path.join(__dirname,'..',oldData.multi_image[j]);
                         await fs.unlinkSync(fullPath1);
                     }
                    for(var i=0;i<req.files.multi_image.length;i++){
                        multipleimg.push(Product.multiImageModel+"/"+req.files.multi_image[i].filename); 
                    }
                    req.body.multi_image = multipleimg;
                }
                var productImagePath = Product.singelImageModel+'/'+req.files.single_image[0].filename;
                req.body.single_image = productImagePath;
               
                req.body.updateDate = new Date().toLocaleString();
                let ad = await Product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/view_product');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/view_product');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/view_product');
            }
        }
        else {
            let oldData = await Product.findById(req.body.EditId);
            if (oldData) {
                if(req.files.multi_image){
                    let multipleimg = [];
                    let oldpro = await Product.findById(req.body.EditId);
                     for(var j=0;j<oldpro.multi_image.length;j++){
                        multipleimg.push(oldpro.multi_image[j]); 
                        var fullPath = path.join(__dirname,'..',oldData.multi_image[j]);
                        await fs.unlinkSync(fullPath);
                     }
                    for(var i=0;i<req.files.multi_image.length;i++){
                        multipleimg.push(Product.multiImageModel+"/"+req.files.multi_image[i].filename); 
                    }
                    req.body.multi_image = multipleimg;
                }
                req.body.single_image = oldData.single_image;
                
                req.body.updateDate = new Date().toLocaleString();
                let ad = await Product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/view_product');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/view_product');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/view_product');
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.redirect('/admin/product/view_product');
    }
}