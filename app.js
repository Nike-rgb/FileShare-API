const express = require('express');

//setting up the server
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log("Listening to port " + PORT);

//allowing cors for the frontend origin
app.use(require('./config/cors.config'));

//connecting to the database
require('./config/db.config')();

//setting up the routes
app.use('/api/upload', require('./api/fileUpload'));
app.use('/api/download', require('./api/download'));
app.use('/api/delete', require('./api/removeFile'));