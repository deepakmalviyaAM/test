const express = require('express');
const router = express.Router();
const transport = require('../mail');

router.post('/sendMail', (req, res) => {
    console.log('Inside sendMail');

    const mailOptions = {
        from: 'Security !',
        to: req.body.email,
        subject: 'Hii ! Sending Email using Node.js',
        text: 'That was easy!'
    };

    transport.transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.json(error)
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ msg: 'Email sent: ' + info.response });
        }
    });
});

module.exports = router;