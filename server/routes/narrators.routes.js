const express = require('express');
const narrators = require('../assets/narrators');
const router = express.Router();

router.get('', (req, res) => {
    return res.json({
        data: narrators,
        error: false,
        amount: narrators.length
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const narr = narrators.find(x => x.id.toString() === id);
    if (!narr) {
        return res.status(404).json({
            data: [],
            error: true,
            message: 'NOT FOUND',
            amount: 0
        });
    }
    return res.status(200).json({
        data: narr,
        error: false,
        amount: 1
    });
})

module.exports = router;
