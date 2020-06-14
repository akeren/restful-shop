const express = require('express');
const router = express.Router();

const authCheck = require('../middleware/authCheck');
const orderController = require('./../controllers/orderController');

router.get('/', authCheck, orderController.getAllOrders);
router.post('/', authCheck, orderController.createOrder);
router.get('/:orderID', authCheck, orderController.getOrder);
router.delete('/:orderID', authCheck, orderController.deleteOrder);

module.exports = router;
