/*
 ** Express NPM module dependence
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

/*
 ** Order Routes 
 */

router.get('/', (req, res, next) => {
    Order.find().select('product quantity _id').populate('product', 'name')
        .exec()
        .then((documets) => {
            if (!documets.length > 0) {
                res.status(404).json({ message: 'No Order Available in the Collection' });
            } else {
                const queryResult = {
                    count: documets.length,
                    orders: documets.map((doc) => {
                        return {
                            quantity: doc.quantity,
                            product: doc.product,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:4000/orders/' + doc._id
                            }
                        };
                    })
                };
                return res.status(200).json(queryResult);
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({ message: 'Product Not Found' });
            }
            const newOrder = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            //Saving the new order 
            return newOrder.save()
                .then((result) => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Order Stored Successfully',
                        orderCreated: {
                            _id: result._id,
                            product: result.product,
                            quantity: result.quantity
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:4000/orders/' + result._id
                        }
                    });
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
router.get('/:orderID', (req, res, next) => {
    const orderId = req.params.orderID;
    Order.findById(orderId).select('_id quantity product').populate('product', '_id name price')
        .exec()
        .then((doc) => {
            if (!doc) {
                res.status(404).json({
                    message: 'Order not Found'
                });
            }
            res.status(200).json({
                order: doc,
                request: {
                    type: 'GET',
                    description: 'VIEW_ALL_ORDERS',
                    url: 'http://localhost:4000/orders'
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});
router.delete('/:orderID', (req, res, next) => {
    const orderId = req.params.orderID;
    Order.remove({ _id: orderId }).exec()
        .then((result) => {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    description: 'POST A NEW PRODUCT',
                    url: 'http://localhost:4000/orders',
                    body: { productId: 'ID', quantity: 'Number' }
                }
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;