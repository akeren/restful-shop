const express = require('express');
const router = express.Router();
const multer = require('multer');
const authCheck = require('../middleware/authCheck');
const productController = require('./../controllers/productController');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
//file filter
const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'png'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({
	storage: storage,
	limits: {
		//fileSize of 5MB only
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});

router.get('/', productController.getAllProducts);
router.post(
	'/',
	authCheck,
	upload.single('productImage'),
	productController.createProduct
);
router.get('/:productID', productController.getProduct);
router.patch('/:productID', authCheck, productController.updateProduct);
router.delete('/:productID', authCheck, productController.deleteProduct);

module.exports = router;
