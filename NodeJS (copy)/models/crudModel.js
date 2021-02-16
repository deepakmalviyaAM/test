const mongoose = require('mongoose');

const crudModel = new mongoose.Schema({
    id: { type: Number, require: true, unique: true },
    name: { type: String },
    sirname: { type: String },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'addressModel', default: [] }],
    createdDate: { type: Date },
    updatedDate: { type: Date }
});

module.exports = mongoose.model('crudModel', crudModel);