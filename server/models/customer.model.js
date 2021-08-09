const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    contacts: [Object]
});

const Customer = mongoose.model('Customers', customerSchema);

module.exports = Customer;