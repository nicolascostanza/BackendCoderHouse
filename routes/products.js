const express = require('express');
const productControllers = require('../controllers/products');

const routerProducts = express.Router();

routerProducts
  .get('/', productControllers.getAllProducts)
  .get('/:id', productControllers.getById)
  .post('/', productControllers.createProduct)
  .put('/:id', productControllers.putById)
  .delete('/:id', productControllers.deleteProduct)

module.exports = routerProducts;
