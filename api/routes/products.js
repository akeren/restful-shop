/*
 ** Express Module 
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

/*
 ** Product Routes
 */
router.get('/', (req, res, next) => {
    //Getting all the products
    Product.find()
        .select('name price _id')
        .exec()
        .then((docs) => {
            if (docs.length > 0) {
                /* console.log(docs); */
                const queryResult = {
                    count: docs.length,
                    products: docs.map((doc) => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:4000/products/' + doc._id
                            }
                        };
                    })
                };
                res.status(200).json(queryResult);
            } else {
                res.status(404).json({ message: "No Product Available in the Collection" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    //create a new product
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    newProduct.save()
        .then((result) => {
            console.log(result)
            res.status(201).json({
                message: "Product Created Successfully",
                productCreated: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/products/' + result._id
                    }
                }
            });
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err });
        });
});
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    //Get a single product
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then((doc) => {

            if (!doc) {
                res.status(404)
                    .json({
                        message: "No valid entry found for the product ID"
                    });
            }
            console.log(`From database`, doc)
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_THE_PRODUCTS',
                    url: 'http://localhost:4000/products'
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch('/:productID', (req, res, next) => {
    const id = req.params.productID;
    const updateOperations = {};
    for (const operations of req.body) {
        updateOperations[operations.propName] = operations.value;
    }
    Product.update({ _id: id }, { $set: updateOperations })
        .exec()
        .then((results) => {
            console.log(results);
            res.status(200).json({
                message: "Product Updated Successfully",
                request: {
                    type: 'GET',
                    url: 'http://localhost:4000/products/' + id
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.delete('/:productID', (req, res, next) => {
    const id = req.params.productID;
    //Delete a single product 
    Product.remove({ _id: id })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: 'Deleted Successfully',
                request: {
                    type: 'POST',
                    description: 'POST_A_NEW_PRODUCT',
                    url: 'http://localhost:4000/products',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;