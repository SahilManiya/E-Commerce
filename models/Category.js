const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    category : {
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

const Category = mongoose.model('Category',CategorySchema);
module.exports = Category; 