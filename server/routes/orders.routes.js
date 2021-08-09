const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Advertiser = require('../models/advertiser.model');
const Customer = require('../models/customer.model');
const Contact = require('../models/contact.model');
const Narrator = require('../models/narrator.model');


router.get('', async (req, res) => {
    try {
        const orders = await Order.find();
        if (orders) {
            return res.status(200).json({
                data: orders,
                error: false
            });
        } else {
            return res.status(404).json({
                data: [],
                error: false
            });
        }
    } catch (error) {
        return res.status(401).json({
            data: orders,
            error: false
        });
    }
});

router.post('', async (req, res) => {
    try {
        let order = await Order.findOne({ id: req.body.id });
        if (order) {
            const o = Order.findOneAndUpdate({ id: order.id }, order);
            if (o) {
                return res.status(200).json({
                    data: o,
                    error: false
                });
            } else {
                return res.json(401).json({
                    error: true,
                    message: 'COULD NOT UPDATE DB'
                });
            }
        } else {
            order = new Order(req.body);
            await order.save();
            return res.status(200).json({
                data: order,
                error: false
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
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


/**
 * Use this function to populate DB with orders from ../assets/orders.json
 */
async function populateOrders() {
    let orderNarrators = [];
    let advertisers = [];
    let customers = [];
    let contacts = [];
    let narrators = [];
    try {
        advertisers = await Advertiser.find();
        customers = await Customer.find();
        contacts = await Contact.find();
        narrators = await Narrator.find();
    } catch (error) {
        console.log(error);
    }
    orders.forEach(async (order) => {
        order.customer = customers.find(c => c.id === order.customerId);
        order.advertiser = advertisers.find(a => a.id === order.advertiserId);
        // order.contact = contacts.find(c => c.id === order.contactId);
        order.contact = order.advertiser.contacts[Math.round(Math.random() * (order.advertiser.contacts.length - 1))];
        order.price = {
            detailes: false,
            fullPrice: order.price,
            discount: order.discount,
            collection: []
        };
        order.narratorsId.forEach(narrId => {
            const n = narrators.find(nar => nar.id === narrId);
            if (n) {
                orderNarrators = [...orderNarrators, n];
            }
        });
        order.narrators = orderNarrators;
        orderNarrators = [];
        try {
            const dbOrder = new Order(order);
            await dbOrder.save();
        } catch (error) {
            return console.log(error);
        }
    });
}

module.exports = router;