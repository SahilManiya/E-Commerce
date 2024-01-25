const mongoose = require('mongoose');
const path = require('path');
const imagePath = '/uploads/Admin';
const multer = require('multer');

const AdminSchema = mongoose.Schema({
    google : {
        type : String
    },
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    city : {
        type : String
    },
    gender : {
        type : String
    },
    description : {
        type : String
    },
    adminImage : {
        type : String
    },
    hobby : {
        type : Array
    },
    isActive : {
        type : Boolean
    },
    currentdate : {
        type : String
    },
    updatedate : {
        type : String
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