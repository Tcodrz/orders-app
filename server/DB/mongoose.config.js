const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/Order-Management';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('open', () => console.log('MongoDB Connected'));
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));
