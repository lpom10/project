import { Router } from 'express';
import * as productoController from '../controllers/producto.controller.js';

const router = Router();
router.get('/', productoController.listarProductos);
router.get('/:id', productoController.obtenerProducto);
router.post('/', productoController.crearProducto);
router.patch('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);


export default router;