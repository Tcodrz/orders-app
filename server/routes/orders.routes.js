const express = require('express');
const router = express.Router();
const orders = require('../assets/ORDERS');
const customers = require('../assets/customers');
const advertisers = require('../assets/advertisers');
const narrators = require('../assets/narrators');
const contacts = require('../assets/contacts');

router.get('', (req, res) => {
    orders.forEach(order => {
        order.customer = customers.find(c => c.id === order.customerId);
        order.advertiser = advertisers.find(a => a.id === order.advertiserId);
        order.narrators = [];
        narrators.forEach(n => {
            if (order.narratorsId.includes(n.id)) { order.narrators.push(n); }
        });
        order.contact = contacts.find(c => c.id === order.contactId)
    });
    res.status(200).json({
        data: orders,
        error: false,
        amount: orders.length
    });
});

router.post('', (req, res) => {
    const order = req.body;
    const newOrders = [...orders, order];
    res.json({
        data: newOrders,
        error: false,
        amount: newOrders.length
    });
});

router.post('/remove', (req, res) => {
    const order = req.body;
    return res.status(200).json({
        data: order,
        error: false,
        amount: 1,
        message: 'ORDER DELETED'
    });
});

module.exports = router;