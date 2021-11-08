const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./DB/mongoose.config');

const ordersRoutes = require('./routes/orders.routes');
const advRoutes = require('./routes/advertisers.routes');
const customersRoutes = require('./routes/customers.routes');
const narratorsRoutes = require('./routes/narrators.routes');
const userRoutes = require('./routes/users.routes');
const authroutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contacts.routes');


const app = express();



const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).json({
    error: false,
    data: 'Server Health Check OK'
  })
});

app.use('/auth', authroutes);
app.use('/users', userRoutes);
app.use('/orders', ordersRoutes);
app.use('/advertisers', advRoutes);
app.use('/customers', customersRoutes);
app.use('/narrators', narratorsRoutes);
app.use('/contacts', contactRoutes);

app.listen(port, () => console.log(`server listenint on port ${port}`));
