const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const singleImagePath = '/uploads/Product/SingleImage';
const multiImagePath = '/uploads/Product/MultiImage';

const ProductSchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subcategory",
        required : true
    },
    extracategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Extracategory",
        required : true
    },
    brand : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Brand",
        required : true
    },
    type : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Type",
        required : true
    },
    product : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    mrp : {
        type : String,
        required : true
    },
    discount : {
        type : String,
        required : true
    },
    color : {
        type : Array,
        required : true
    },
    size : { 
        type : Array,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    single_image : {
        type : String,
        required : true
    },
    multi_image : {
        type : Array,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    currentdate : {
        type : String,
        required : true
    },
    updatedate : {
        type : String,
        required : true
    }
})

ProductSchema.statics.singelImageModel = singleImagePath;
ProductSchema.statics.multiImageModel = multiImagePath;

const imageStore = multer.diskStorage({
    destination : function(req,file,cb){
        if(file.fieldname=='single_image'){
            cb(null,path.join(__dirname,"..",singleImagePath));
        }
        else{
            cb(null,path.join(__dirname,"..",multiImagePath));
        }
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Math.random()*10000000); 
    }
})
ProductSchema.statics.uploadImage = multer({storage:imageStore}).fields([{name:"single_image",maxCount:1},{name:"multi_image",maxCount:5}]);

const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;