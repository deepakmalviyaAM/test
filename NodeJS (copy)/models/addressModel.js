const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    id: { type: Number, require: true, unique: true },
    empObjId: { type: mongoose.Schema.Types.ObjectId, ref: 'crudModel' },
    city: { type: String },
    pin: { type: Number },
    state: { type: String },
    createdDate: { type: Date },
    updatedDate: { type: Date }
});

module.exports = mongoose.model('addressModel', addressSchema);