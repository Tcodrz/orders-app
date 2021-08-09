const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const router = express.Router()


/**
 * LOGIN FUNCTION
 */
router.post('', async (req, res) => {
    try {
        const userInput = req.body;
        const user = await User.findOne({ email: userInput.username }, '+password');
        if (!user) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'User Not Found'
            });
        }

        bcrypt.compare(userInput.password, user.password, (err, same) => {
            if (err) {
                return res.status(400).json({
                    data: [],
                    error: true,
                    message: 'One of the details is incorrect'
                });
            }
            if (same) {
                user.password = undefined;
                return res.status(200).json({
                    data: user,
                    error: false
                });
            } else {
                return res.status(400).json({
                    data: [],
                    error: true,
                    message: 'One of the details is incorrect'
                });
            }
        });
    } catch (error) {
        return res.status(401).json({
            data: [],
            error: true,
            message: error.message
        });
    }

});

module.exports = router;