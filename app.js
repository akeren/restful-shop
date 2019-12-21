/*
 ** NPM module dependence
 */
const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.status(200).json({ message: "Hello, Client! Thanks for connecting..." });
});

module.exports = { app }