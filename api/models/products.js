/*
 ** Mongoose module 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productScheme = new Schema({
    _id: ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productScheme);

module.exports = Product;