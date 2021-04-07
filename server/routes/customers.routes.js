const express = require('express');
const customers = require('../assets/customers');
const router = express.Router();

router.get('', (req, res) => {
    return res.status(200).json({
        data: customers,
        error: false,
        amount: customers.length
    });
});

router.get('/:id', (req, res) => {
    console.log('Requested Customer id: ' + req.params.id);
    const id = req.params.id;
    const customer = customers.find(x => x.id.toString() === id);
    if (!customer) {
        return res.status(404).json({
            data: [],
            error: true,
            amount: 0,
            message: 'NOT FOUND'
        });
    }
    return res.status(200).json({
        data: customer,
        error: false,
        amount: customers.length
    });
});

module.exports = router;