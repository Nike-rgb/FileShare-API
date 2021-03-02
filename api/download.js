const Router = require('express').Router();
const File = require('../models/file');

//download page api
Router.get('/:uuid/:fileName', (req, res) => {
    File.findOne({uuid : req.params.uuid}, (err, fileObj) => {
        if(err || !fileObj) {
            return res.json({
                'error' : 'Something went wrong. Try again',
            });
        }
        const filePath = `${__dirname}/../uploads/${req.params.fileName}`;
        res.download(filePath)
    });
});

//download list endpoint
Router.get('/:uuid', (req, res) => {
    File.findOne({uuid : req.params.uuid}, (err, fileObj) => {
        if(err || !fileObj) {
            return res.json({
                'error' : 'Something went wrong. Try again',
            });
        }
        fileObj = fileObj.toObject();
        let files = Array.from(fileObj.files);
        files.forEach(file => {
            let downloadLink = `${process.env.APP_BASE_URL}/api/download/${req.params.uuid}/${file.fileName}`;
            file.downloadLink = downloadLink;
        });
        res.json(files);
    })
});

module.exports = Router;