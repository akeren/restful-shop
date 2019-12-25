/*
 ** Express NPM module dependence
 */
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/*
 ** imported the apis from the api>routes directory 
 */
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
/*
 ** MongDB Atlas connection using 
 */
/* mongoose.connect("mongodb+srv://restful-shop:" + process.env.MONGO_ATLAS_PASS + "@restful-shop-ol9at.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); */

// MongoDB Local Connection
mongoose.connect('mongodb://localhost/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//mongoose.Promise = global.Promise;

/*
 ** Logging incoming requests
 */
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
/*
 ** Body-parser middleware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 ** Handling Cross Origin Resource Sharing (CORS))
 */
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/*
 ** Routes middleware
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
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