const { connect } = require('mongoose');
(async () => {
	try {
		await connect('mongodb://127.0.0.1:27017/shop', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	} catch (error) {
		console.log('Error', error);
	}
})();
