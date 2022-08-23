const express = require('express')
const productsRoutes = require('./products');

const router = express.Router();

router.use('/products', productsRoutes);

module.exports = router;