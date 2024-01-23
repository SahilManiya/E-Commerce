const mongoose = require('mongoose');
const ExtracategorySchema = mongoose.Schema({
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

const Extracategory = mongoose.model('Extracategory',ExtracategorySchema);
module.exports = Extracategory;