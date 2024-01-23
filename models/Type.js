const mongoose = require('mongoose');
const TypeSchema = mongoose.Schema({
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

const Type = mongoose.model('Type',TypeSchema);
module.exports = Type;