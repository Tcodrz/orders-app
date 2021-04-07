const express = require('express');
const router = express.Router();
const advertisers = require('../assets/advertisers');

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