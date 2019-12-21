/*
 ** Express NPM module dependence
 */
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
/*
 ** imported the apis from the api>routes directory 
 */
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

/*
 ** Logging incoming requests
 */
app.use(morgan('dev'));
/*
 ** Body-parser middleware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
 ** Routes middleware
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

/*
 ** Handling errors 
 */
app.use((req, res, next) => {
    const error = new Error('oops! - Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});


module.exports = { app }