const Router = require('express').Router();
require('dotenv').config();
const multer = require('multer');
const File = require('../models/file');
const {v4 : uuid4} = require('uuid');
const path = require('path');

let storage = multer.diskStorage({
    destination : (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename : (req, file, cb) => {
      const name = `${Date.now()}${Math.floor(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, name);
    }
  });

  const upload = multer({
    storage,
    limits : {
      filesize : 2*20 * 100, //100 MB
    },
  }).array('myfile');

  
Router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if(err) return res.json({
          error : "Sorry something went wrong",
        });
    
        let files = [];
    
        req.files.forEach(file => {
          files.push({
            fileName : file.filename,
            fileSize : file.size,
            fileOriginalName : file.originalname,
          });
        });
    
        //store file info in the database
        new File({
          files,
          uuid : uuid4(),
        }).save((err, file) => {
          if(err) {
            return res.json({
              error : 'Something went wrong',
            });
          }
          res.json({uuid : file.uuid, downloadPageLink : `${process.env.FRONTEND_BASE_URL}/files/${file.uuid}`});
        });
      });
});

module.exports = Router;