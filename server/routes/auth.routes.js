const express = require('express');
const router = express.Router()
const users = require('../assets/users.json');

router.post('', (req, res) => {
    const user = req.body;
    console.log(user);
    const u = users.find(u => u.email == user.username);
    console.log(u);

    if (!u || u.password !== parseInt(user.password, 10)) {
        return res.status(404).json({
            data: null,
            error: true,
            amount: 0,
            message: 'one or more of the users details is incorrect'
        });
    } else {
        return res.status(200).json({
            data: u,
            error: false,
            amount: 1,
            message: ''
        });
    }

});

module.exports = router;