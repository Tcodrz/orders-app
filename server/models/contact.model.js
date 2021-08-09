const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    phone: Number
});

const Contact = mongoose.model('Contacts', contactSchema);

module.exports = Contact;