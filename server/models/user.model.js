const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    password: {
        type: String,
        required: true,
        select: false
    },
    email: String,
    admin: Boolean
});


userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        } else {
            this.password = hash;
            return next();
        }
    });
});


const User = mongoose.model('Users', userSchema);

module.exports = User;