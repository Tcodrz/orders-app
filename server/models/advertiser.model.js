const mongoose = require('mongoose');

const advertiserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    contacts: [Object]
});

const Advertiser = mongoose.model('Advertiser', advertiserSchema);

module.exports = Advertiser;