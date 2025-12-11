import { Request, Response } from 'express';
import ProductoModel from '../models/producto.model.js';

export const listarProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoModel.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      data: productos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: Number(p.precio),
        stock: p.stock,
        activo: p.activo
      })),
      total: productos.length
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// ... código anterior ...

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, categoria, precio, stock } = req.body;

    // Validación básica
    if (!nombre || !descripcion || !categoria || precio == null || stock == null) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const producto = await ProductoModel.create({
      nombre,
      descripcion,
      categoria,
      precio,
      stock
    });

    res.status(201).json({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      precio: Number(producto.precio),
      stock: producto.stock,
      activo: producto.activo
    });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Ya existe un producto con ese nombre' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const obtenerProducto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      precio: Number(producto.precio),
      stock: producto.stock,
      activo: producto.activo
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.update(req.body);

    res.json({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      stock: producto.stock
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.update({ activo: false });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};