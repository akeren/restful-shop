const { connect } = require('mongoose');
(async () => {
	try {
		await connect('mongodb://localhost/shop', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	} catch (error) {
		console.log(error);
	}
})();
