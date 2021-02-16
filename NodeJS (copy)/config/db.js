const mongoose = require('mongoose');
const service = require('../service.json');
const url = service.dbUrl;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log('Error to connecting DB');
    else console.log('DB Connected Successfully');
});