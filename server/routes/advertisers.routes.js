const express = require('express');
const router = express.Router();
const advertisers = require('../assets/advertisers');
const contacts = require('../assets/contacts.json');

advertisers.forEach(adv => {
    advContacts = [];
    contacts.forEach(c => {
        if (adv.contacts.includes(c.id)) {
            advContacts.push(c);
        }
    });
    adv.contacts = advContacts;
});

router.get('', (req, res) => {
    return res.json({
        data: advertisers,
        error: false,
        amount: advertisers.length
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const adv = advertisers.find(x => x.id.toString() === id);
    if (!adv) {
        return res.json({
            data: [],
            error: true,
            amount: 0,
            message: 'NOT FOUND'
        });
    }
    return res.json({
        data: adv,
        error: false,
        amount: 1
    });
});

module.exports = router;