const express = require('express');
const router = express.Router();
const service = require('../service.json');

router.post('/fileUpload', (req, res) => {
    console.log('Inside fileUpload', req.files);
    const file = req.files.sampleFile;
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).send('No files were uploaded.');

    const fileData = service.imgPath + req.files.sampleFile.name;
    file.mv(fileData, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

module.exports = router;