const express = require('express');
const Contact = require('../models/contact.model');
const router = express.Router();

const contacts = require('../assets/contacts.json');

router.post('', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({
            data: contact,
            error: false
        });
    } catch (error) {
        return res.status(401).json({
            data: [],
            error: false
        });
    }
});


/**
 * Use this function to populate DB with contacts from ../assets/contacts.json
 */
function populateContacts() {
    contacts.forEach(async (contact) => {
        try {
            const c = new Contact(contact);
            await c.save();
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = router;