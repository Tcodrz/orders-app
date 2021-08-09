const express = require('express');
const router = express.Router();
const contacts = require('../assets/contacts.json');
const Customer = require('../models/customer.model');

/**
 * Get All Customers
 */
router.get('', async (req, res) => {
    try {
        let customers = await Customer.find();
        if (!customers) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'NOT FOUND'
            });
        } else {
            return res.status(200).json({
                data: customers,
                error: false
            });
        }
    } catch (error) {
        return res.status(400).json({
            data: [],
            error: true,
            message: error.message
        });
    }
});

/**
 * Get Customer By ID
 */
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findOne({ id: id });
        if (!customer) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'NOT FOUND'
            });
        } else {
            return res.status(200).json({
                data: customer,
                error: false
            });
        }
    } catch (error) {
        return res.status(400).json({
            data: [],
            error: true,
            message: error.message
        });
    }
});

/**
 * Use this function to populate DB with customers from ../assets/customers.json
 */
function populateCustomers() {
    let contactObjects = [];
    customers.forEach(async (customer) => {
        customer.contacts.forEach(contactId => {
            const contact = contacts.find(c => c.id === contactId);
            if (contact) {
                contactObjects = [...contactObjects, contact];
            }
        });
        customer.contacts = contactObjects;
        contactObjects = [];
        try {
            const c = new Customer(customer);
            await c.save();
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = router;