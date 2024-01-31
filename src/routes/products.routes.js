const express = require('express');
const productController = require('../controllers/products.controller');
const upload = require('../middlewares/productImageUpload');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();   

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.post('/create-product', upload.array('image', 5), productController.createProducts);


module.exports = router;