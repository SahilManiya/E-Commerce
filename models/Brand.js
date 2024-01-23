const mongoose = require('mongoose');
const BrandSchema = mongoose.Schema({
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
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    current_date : {
        type : String,
        required : true
    },
    update_date : {
        type : String,
        required : true
    }
})

const Brand = mongoose.model('Brand',BrandSchema);
module.exports = Brand;