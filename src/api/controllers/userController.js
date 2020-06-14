const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
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
						newUser
							.save()
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
};

exports.login = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({ message: 'Auth Failed' });
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Auth Failed'
					});
				}

				if (result) {
					const token = jwt.sign(
						{
							email: user[0].email,
							userId: user[0]._id
						},
						process.env.JWT_KEY,
						{
							expiresIn: '1h'
						}
					);
					return res.status(200).json({
						message: 'Auth Successful',
						token: token
					});
				}
				res.status(401).json({
					message: 'Auth Failed'
				});
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};

exports.deleteUser = (req, res, next) => {
	User.remove({ _id: req.params.userId })
		.exec()
		.then((result) => {
			res.status(200).json({ message: 'User deleted' });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
};
