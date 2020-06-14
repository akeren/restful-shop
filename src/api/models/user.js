const { Schema, model } = require('mongoose');
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	_id: ObjectId,
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	password: {
		type: String,
		required: [true, 'Enter your password']
	}
});

module.exports = model('User', userSchema);
