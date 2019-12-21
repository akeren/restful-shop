/*
 ** Express NPM module dependence
 */
const express = require('express');
const app = express();

/*
 ** imported the apis from the api>routes directory 
 */
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

/*
 ** Routes middleware
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = { app }