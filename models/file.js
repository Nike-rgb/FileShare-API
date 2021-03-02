const mongoose = require('mongoose');

module.exports = mongoose.model('file', new mongoose.Schema({
    uuid : {type : String, required : true},
    files : [
        {
            fileName : String,
            fileSize : Number,
            fileOriginalName : String,
        }
    ]
}));