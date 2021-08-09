const express = require('express');
const router = express.Router();
const contacts = require('../assets/contacts.json');
const Advertiser = require('../models/advertiser.model');


router.get('', async (req, res) => {
    try {
        const advertisers = await Advertiser.find();
        if (!advertisers) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'NOT FOUND'
            });
        } else {
            return res.status(200).json({
                data: advertisers,
                error: false,
            });
        }
    } catch (error) {
        return console.log(error);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const adv = await Advertiser.findOne({ id: id });
        if (!adv) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'NOT FOUND'
            });
        } else {
            return res.status(200).json({
                data: adv,
                error: false
            });
        }
    } catch (error) {
        return console.log(error);
    }
});

/**
 * Use this function to populate th DB with advertisers from ../assets/advertisers
 */
function populateAdvertisers() {
    let newContacts = [];
    advertisers.forEach(async (adv) => {
        adv.contacts.forEach(contactId => {
            const contact = contacts.find(c => c.id === contactId);
            if (contact) {
                newContacts = [...newContacts, contact];
            }
        });
        adv.contacts = newContacts;
        newContacts = [];
        try {
            const a = new Advertiser(adv);
            await a.save();
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = router;