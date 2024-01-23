const mongoose = require('mongoose');
const path = require('path');
const imagePath = '/uploads/Admin';
const multer = require('multer');

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    adminImage : {
        type : String,
        required : true
    },
    hobby : {
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

AdminSchema.statics.imageModel = imagePath;

const imageStore = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imagePath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
})

AdminSchema.statics.uploadImage = multer({storage:imageStore}).single('adminImage');
const Admin = mongoose.model('Admin',AdminSchema);
module.exports = Admin;