const express = require('express');
const cors = require('cors');
const ordersRoutes = require('./routes/orders.routes');
const advRoutes = require('./routes/advertisers.routes');
const customersRoutes = require('./routes/customers.routes');
const narratorsRoutes = require('./routes/narrators.routes');
const morgan = require('morgan');



const app = express();

const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/orders', ordersRoutes);
app.use('/advertisers', advRoutes);
app.use('/customers', customersRoutes);
app.use('/narrators', narratorsRoutes);

app.listen(port, () => console.log(`server listenint on port ${port}`));