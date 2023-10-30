const express = require('express');
const router = express.Router();
const multerMiddleware = require('../middlewares/imagenes.middleware'); 
const authMiddleware = require('../middlewares/auth.middleware');

const {
  createProducto,
  updateProducto,
  deleteProducto,
  getProducto,
  getProductos
} = require('../controllers/productos.controller'); 

router.post('/', authMiddleware.verificarJWT, multerMiddleware.single('imagen'), createProducto);

router.put('/:codigo', authMiddleware.verificarJWT, multerMiddleware.single('imagen'), updateProducto);

router.delete('/:codigo', authMiddleware.verificarJWT, deleteProducto);

router.get('/:codigo', authMiddleware.verificarJWT, getProducto);
router.get('/', getProductos);



module.exports = router;
