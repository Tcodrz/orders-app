const mongoose = require('mongoose');

const narratorSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number
});

const Narrator = mongoose.model('Narrators', narratorSchema);

module.exports = Narrator;