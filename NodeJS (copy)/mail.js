const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'deepak.malviya@amdev.in',
        pass: 'Deep@k008'
    }
});