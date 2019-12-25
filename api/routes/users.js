/*
 ** Third part modules 
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'User with the Email Already Exist.'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        const newUser = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        newUser.save()
                            .then((result) => {
                                console.log(result);
                                res.status(201).json(result);
                            })
                            .catch((err) => {
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId }).exec()
        .then((result) => {
            res.status(200).json({ message: 'User deleted' });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = router;