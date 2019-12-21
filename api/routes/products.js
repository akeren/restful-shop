/*
 ** Express Module 
 */
const express = require('express');
const router = express.Router();

/*
 ** Product Routes
 */
router.get('/', (req, res, next) => {
    res.status(200).json({ message: "Handling get requests from /products" });
});

router.post('/', (req, res, next) => {
    res.status(201).json({ message: "Handling POST requests from /products" });
});
router.get('/:productID', (req, res, next) => {
    const id = req.params.productID;
    if (id === 'kater') {
        res.status(200).json({ message: "Handling a GET single Product", id: id });
    } else {
        res.status(200).json({ message: "Handling Single Product", productID: id });
    }
});
router.patch('/:productID', (req, res, next) => {
    res.status(200).json({ message: "Handling PATCH Request", productID: req.params.productID });
});

router.delete('/:productID', (req, res, next) => {
    res.status(200).json({ message: "Handling DELETE", productID: req.params.productID });
});

module.exports = router;