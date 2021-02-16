const express = require('express');
const router = express.Router();
const crudModel = require('../models/crudModel');
const functions = require('../functions')

router.get('/getAllData', async(req, res) => {
    console.log('Inside getAllData');
    const data = await crudModel.find().populate('address', 'city -_id').select('name sirname');
    res.json({ data: data })
})

router.post('/addData', async(req, res) => {
    console.log('Inside addData');
    try {
        const checkId = await crudModel.findOne({ id: req.body.id });
        if (checkId) return res.json({ msg: 'Emp already added !!' })
        let db = new crudModel({
            id: req.body.id,
            name: req.body.name,
            sirname: req.body.sirname,
            city: req.body.city,
            createdDate: functions.convertUTCDateToLocalDate(new Date()),
            updatedDate: functions.convertUTCDateToLocalDate(new Date())
        })
        db.save();
        res.json({ msg: 'Data inserted successfully' });
    } catch (err) {
        res.json({ err: err })
    }
})

router.post('/updateData', async(req, res) => {
    console.log('Inside updateData');
    const name = req.body.name;
    const sirname = req.body.sirname;
    const city = req.body.city;
    let obj = {};
    let data = await crudModel.findOne({ id: req.body.id });
    if (!data) res.json({ msg: 'No user Found !' })
    if (name) obj.name = name
    if (sirname) obj.sirname = sirname
    if (city) obj.city = city
    obj.updatedDate = functions.convertUTCDateToLocalDate(new Date())
    console.log(obj)
    await crudModel.findOneAndUpdate({ id: req.body.id }, obj);
    res.json({ old: data, new: obj });
})

router.post('/deleteData', async(req, res) => {
    console.log('Inside deleteData');

    const data = await crudModel.deleteOne({ id: req.body.id });
    if (data.deletedCount == 0) res.status(500).json({ msg: 'No Data Found !!!' });
    res.status(500).json({ msg: 'Data Deleted Successfully' });
})

module.exports = router;