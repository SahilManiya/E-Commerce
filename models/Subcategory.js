const mongoose = require('mongoose');
const SubcategorySchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    subcategory : {
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

const Subcategory = mongoose.model('Subcategory',SubcategorySchema);
module.exports = Subcategory;