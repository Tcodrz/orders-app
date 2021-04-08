const express = require('express');
const router = express.Router();

const users = require('../assets/users');

router.get('', (req, res) => {
    res.status(200).json({
        data: users,
        error: false,
        amount: users.length,
        massage: ''
    });
});

module.exports = router;
