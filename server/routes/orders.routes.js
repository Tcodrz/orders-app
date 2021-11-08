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


  // Order.findById(req.body,_id)

  console.log(req.body);
  let order = null;
  if (!req.body._id) {
    order = new Order(req.body);
    await order.save();
  }
  else {
    order = await Order.findOneAndUpdate({ '_id': req.body._id }, req.body);
  }

  if (!order) {
    return res.status(400).json({
      error: true,
      data: [],
      message: 'Could not process that request'
    });
  } else {
    return res.status(200).json({
      error: false,
      data: order
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

  const orders = require('../assets/ORDERS.json');

  orders.forEach(async (order) => {
    order.customer = customers.find(c => c.id === order.customerId);
    order.advertiser = advertisers.find(a => a.id === order.advertiserId);
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


// populateOrders().then(() => console.log('DB Populated'))
  // .catch ((e) => console.error(e));
