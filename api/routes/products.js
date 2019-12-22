/*
 ** Express Module 
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

/*
 ** Product Routes
 */
router.get('/', (req, res, next) => {
    //Getting all the products
    Product.find()
        .exec()
        .then((docs) => {
            if (docs.length > 0) {
                console.log(docs);
                res.status(200).json(docs)
            } else {
                res.status(204).json({ message: "No Product Available in the Collection" });
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
                message: "Handling POST requests from /products",
                createdProduct: result
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
        .exec()
        .then((doc) => {
            console.log(`From database`, doc)
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404)
                    .json({
                        message: "No valid entry found for the product ID"
                    });
            }
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
            res.status(200).json(results);
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
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;