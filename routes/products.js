const express = require('express');
const productControllers = require('../controllers/products');

const router = express.Router();

router
  .get('/', productControllers.getAllProducts)
  .get('/:id', productControllers.getById)
  .post('/', productControllers.createProduct)
  .put('/:id', productControllers.putById)
  .delete('/:id', productControllers.deleteProduct)

export default router;
