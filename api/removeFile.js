const Router = require('express').Router();
const File = require('../models/file');

Router.get('/:uuid/:fileName', (req, res) => {
    let {uuid, fileName} = req.params;
    console.log(uuid);
    File.findOne({uuid}, (err, fileObj) => {
        if(err || !fileObj) {
            return res.json({'error' : 'Something went wrong. Try again'});
        }
        let fileArr = fileObj.files;
        let toDelete = fileArr.find(file => file.fileName == fileName);
        if(!toDelete) return res.json({'error' : 'No such file exists.'});
        fileArr.splice(fileArr.indexOf(toDelete), 1);
        fileObj.save((err, updatedFileObj) => {
            if(err) return res.json({'error' : 'Something went wrong. Try again.'});
            res.json(updatedFileObj.files);
        });
    })
});

module.exports = Router;