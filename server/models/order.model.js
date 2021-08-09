const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: String,
    date: String,
    advertiser: {
        type: Object
    },
    contact: {
        type: Object
    },
    customer: {
        type: Object
    },
    campaign: String,
    type: String,
    status: String,
    invoiceNumber: String,
    price: {
        fullPrice: Number,
        discount: Number,
        collection: [Object],
        detailes: Boolean
    },
    generalNotes: String,
    bookkeepingNotes: String,
    narrators: {
        type: [Object]
    },
    narratorsPrice: Number,
    numberOfVersion: Number,
    numberOfVariations: Number,
    responsibility: {
        narrator: String,
        text: String,
        music: String
    },
    usagePeriod: String,
    music: String,
    studioServicesIcluded: Boolean
});

const Order = mongoose.model('Orders', orderSchema);

module.exports = Order;

