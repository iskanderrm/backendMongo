const express = require('express');
const router = express.Router();
const multerMiddleware = require('../middlewares/imagenes.middleware'); 
const authMiddleware = require('../middlewares/auth.middleware');

const {
  createProducto,
  updateProducto,
  deleteProducto,
  getProducto,
  getProductos,
  getCategoria,
  buscarPorCodigo,
  getCascosPorTalla
} = require('../controllers/productos.controller'); 

router.post('/', authMiddleware.verificarJWT, multerMiddleware.single('imagen'), createProducto);

router.put('/:codigo', authMiddleware.verificarJWT, multerMiddleware.single('imagen'), updateProducto);

router.delete('/:codigo', authMiddleware.verificarJWT, deleteProducto);

router.get('/:codigo', authMiddleware.verificarJWT, getProducto);
router.get('/buscar/:codigo', authMiddleware.verificarJWT, buscarPorCodigo);

router.get('/', getProductos);
router.get('/categorias/:categoria', getCategoria);

router.get('/search/cascos', getCascosPorTalla);





module.exports = router;
