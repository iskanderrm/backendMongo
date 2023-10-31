const Producto = require("../models/productos.model");
const fs = require("fs");

const createProducto = async (req, res) => {
  try {
    const { codigo, modelo, marca, tipo_producto, created_by } = req.body;
    const url_imagen = req.file.filename;

    const existingProduct = await Producto.findOne({ codigo });

    if (existingProduct) {
      res.status(400).json({ message: "Código de producto no disponible" });
      return;
    }

    const nuevoProducto = new Producto({
      codigo,
      modelo,
      marca,
      url_imagen,
      tipo_producto, // * Debe ser un objeto
      created_by,
    });

    await nuevoProducto.save();

    res.status(201).json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { modelo, marca, tipo_producto, updated_by } = req.body;

    const producto = await Producto.findOne({ codigo: codigo, deleted: false });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    fs.unlinkSync(`public/${producto.url_imagen}`);

    producto.modelo = modelo;
    producto.marca = marca;
    producto.tipo_producto = tipo_producto;
    producto.updated_at = new Date();
    producto.updated_by = updated_by;

    if (req.file) {
      producto.url_imagen = req.file.filename;
    }

    await producto.save();

    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const { codigo } = req.params;

    const producto = await Producto.findOne({ codigo: codigo, deleted: false });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    producto.deleted = true;
    producto.deleted_at = new Date();
    producto.deleted_by = req.body.deleted_by;

    await producto.save();

    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

const getProducto = async (req, res) => {
  try {
    const { codigo } = req.params;

    const producto = await Producto.findOne({ codigo: codigo });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto" });
  }
};

const getCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;

    const producto = await Producto.find({ 'tipo_producto.categoria': categoria  });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto" });
  }
};

const getProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page - 1) * limit;
    const totalProductos = await Producto.countDocuments({ deleted: false });
    const totalPages = Math.ceil(totalProductos / limit);

    if (page > totalPages) {
      return res.status(404).json({ error: "Página no encontrada" });
    }

    const productos = await Producto.find({ deleted: false })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      productos,
      currentPage: page,
      totalPages,
      totalProductos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al buscar los productos" });
  }
};

module.exports = {
  createProducto,
  updateProducto,
  deleteProducto,
  getProducto,
  getProductos,
  getCategoria
};
