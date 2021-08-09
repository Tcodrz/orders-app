const express = require('express');
const router = express.Router();
const User = require('../models/user.model');


router.get('', async (req, res) => {
    try {
        const users = await User.find();
        if (!user) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'NOT FOUND'
            });
        } else {
            return res.status(200).json({
                data: users,
                error: false
            });
        }
    } catch (error) {
        return res.status(401).json({
            data: [],
            error: true,
            message: error.message
        });
    }
});

/**
 * Use this function to populate DB with users from ../assets/users.json
 */
function populateUsers() {
    users.forEach(async (user) => {
        try {
            const u = new User(user);
            await u.save();
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = router;
