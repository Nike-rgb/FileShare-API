const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function () {
    mongoose.connect(process.env.MONGO_DB_URI, {
        useUnifiedTopology : true,
        useCreateIndex : true,
        useNewUrlParser : true,
    }).then(() => {
        console.log("Connected to the database");
    }).catch(err => {
        throw err;
    });
}