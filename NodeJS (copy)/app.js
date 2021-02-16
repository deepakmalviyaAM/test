require('dotenv').config()
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const db = require('./config/db');
const crud = require('./routes/crud');
const address = require('./routes/address');
const nodemailer = require('./routes/nodemailer');
const uploadFile = require('./routes/uploadFile');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use('/crud', crud);
app.use('/address', address);
app.use('/nodemailer', nodemailer);
app.use('/uploadFile', uploadFile);

app.listen(process.env.PORT, (err) => {
    if (err) console.log('There is error to creating server');
    else console.log(`Server is running on port ${process.env.PORT}`);
})