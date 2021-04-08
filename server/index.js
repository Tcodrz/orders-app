const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const ordersRoutes = require('./routes/orders.routes');
const advRoutes = require('./routes/advertisers.routes');
const customersRoutes = require('./routes/customers.routes');
const narratorsRoutes = require('./routes/narrators.routes');
const userRoutes = require('./routes/users.routes');
const authroutes = require('./routes/auth.routes');



const app = express();

const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/auth', authroutes);
app.use('/users', userRoutes);
app.use('/orders', ordersRoutes);
app.use('/advertisers', advRoutes);
app.use('/customers', customersRoutes);
app.use('/narrators', narratorsRoutes);

app.listen(port, () => console.log(`server listenint on port ${port}`));