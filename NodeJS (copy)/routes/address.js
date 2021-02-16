const express = require('express');
const router = express.Router();
const addressModel = require('../models/addressModel');
const crudModel = require('../models/crudModel');
const functions = require('../functions');

router.post('/addAddress', async(req, res) => {
    console.log('Inside addAddress');
    try {
        let checkId = await crudModel.findOne({ id: req.body.id });
        if (!checkId) return res.json({ msg: 'No Data Found !!' });
        const checkData = await addressModel.findOne({ id: req.body.id });
        if (checkData) return res.json({ msg: 'Address already added !' });
        let db = new addressModel({
            id: req.body.id,
            empObjId: checkId._id,
            city: req.body.city,
            pin: req.body.pin,
            state: req.body.state,
            createdDate: functions.convertUTCDateToLocalDate(new Date()),
            updatedDate: functions.convertUTCDateToLocalDate(new Date())
        })
        db.save((err, data) => {
            console.log(data)
            checkId.address.push(data._id);
            checkId.save();
            console.log(checkId)
        });
        res.json({ msg: 'Address inserted successfully' });
    } catch (err) {
        res.json({ err: err })
    }
});

router.get('/getAllAddress', async(req, res) => {
    console.log('Inside getAllAddress');
    const data = await addressModel.find().populate('empObjId', 'name');
    res.json({ data: data })
});

module.exports = router;