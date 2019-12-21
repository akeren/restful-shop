/*
 ** Express NPM module dependence
 */
const express = require('express');
const router = express.Router();

/*
 ** Order Routes 
 */

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "Handling All orders from /orders" });
});
router.post('/', (req, res, next) => {
    res.status(201).json({ message: "Handling POST Request" });
});
router.get('/:orderID', (req, res, next) => {
    res.status(200).json({ message: "Fetch a Single order", orderID: req.params.orderID });
});
router.delete('/:orderID', (req, res, next) => {
    res.status(200).json({ message: "Deleted Method", orderID: req.params.orderID });
});

module.exports = router;