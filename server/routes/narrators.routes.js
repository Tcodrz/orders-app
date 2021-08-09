const express = require('express');
const Narrator = require('../models/narrator.model');
const router = express.Router();

// populateNarrators();

/**
 * Get all Narrators
 */
router.get('', async (req, res) => {
    try {
        const narrators = await Narrator.find();
        if (!narrators) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'NOT FOUND'
            });
        } else {
            return res.status(200).json({
                data: narrators,
                error: false
            });
        }
    } catch (error) {
        return console.log(error);
    }
});

/**
 * Get Narrator by ID
 */
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const narrator = await Narrator.findOne({ id: id });
        if (!narrator) {
            return res.status(404).json({
                data: [],
                error: true,
                message: 'NOT FOUND'
            });
        } else {
            return res.status(200).json({
                data: narrator,
                error: false
            });
        }
    } catch (error) {
        return console.log(error);
    }
});

/**
 * Use this function to populate DB with narrators from ../assets/narrators.json
 */
function populateNarrators() {
    narrators.forEach(async (n) => {
        try {
            const nar = new Narrator(n);
            await nar.save();
        } catch (error) {
            console.log(error);
        }
    });
}

module.exports = router;
