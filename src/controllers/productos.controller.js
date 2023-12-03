const Producto = require("../models/producto.model");
const fs = require("fs");
const socket = require("../configs/socket.config");
const io = socket.getIo()
const mongoose = require("mongoose");

const createProducto = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { codigo, modelo, marca, categoria } = req.body;
    const url_imagen = req.file.filename;
    const created_by = req.usuario.id;

    const existingProduct = await Producto.findOne({ codigo });

    if (existingProduct) {
      return res.status(400).json({ message: "Código de producto no disponible" });
    }

    let producto = {
      codigo,
      modelo,
      marca,
      url_imagen,
      categoria,
      created_by,
    };

    switch (categoria) {
      case "cascos":
        producto.talla = req.body.talla;
        break;
      case "maletas":
        producto.capacidad = req.body.capacidad;
        break;
      case "llantas":
        producto.tipo_llanta = req.body.tipo_llanta;
        producto.rin = req.body.rin;
        producto.medida = req.body.medida;
        break;
      case "accesorios":
        producto.descripcion = req.body.descripcion;
        producto.compatibilidad = req.body.compatibilidad;
        break;
      case "equipo_personal":
        producto.color = req.body.color;
        producto.talla = req.body.talla;
        break;
      default:
        return res.status(400).json({ message: "Categoría no válida" });
    }
     console.log(producto)
    const nuevoProducto = new Producto(producto);
    await nuevoProducto.save();
    await io.emit('productoCreado', { nuevoProducto });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Producto agregado exitosamente." });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

const updateProducto = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { codigo } = req.params;
    const { codigoEditado,modelo, marca, categoria, editarImagen } = req.body;
    const updated_by = req.usuario.id;

    const producto = await Producto.findOne({ codigo: codigo, deleted: false });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    if (editarImagen){
      try {
      } catch (error) {
        console.error("Error al eliminar el archivo:", error);
      }
    }

    producto.codigo = codigoEditado;
    producto.modelo = modelo;
    producto.marca = marca;
    producto.categoria = categoria;
    producto.updated_at = new Date();
    producto.updated_by = updated_by;

    switch (categoria) {
      case "cascos":
        producto.talla = req.body.talla;
        break;
      case "maletas":
        producto.capacidad = req.body.capacidad;
        break;
      case "llantas":
        producto.tipo_llanta = req.body.tipo_llanta;
        producto.rin = req.body.rin;
        producto.medida = req.body.medida;
        break;
      case "accesorios":
        producto.descripcion = req.body.descripcion;
        producto.compatibilidad = req.body.compatibilidad;
        break;
      case "equipo_personal":
        producto.color = req.body.color;
        producto.talla = req.body.talla;
        break;
      default:
        return res.status(400).json({ message: "Categoría no válida" });
    }

    if (req.file) {
      fs.unlinkSync(`public/images/${producto.url_imagen}`);
      producto.url_imagen = req.file.filename;
    }

    await producto.save();
    await io.emit('productoActualizado', { producto, codigo });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.log(error)
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

const deleteProducto = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { codigo } = req.params;

    const producto = await Producto.findOne({ codigo: codigo, deleted: false });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    producto.deleted = true;
    producto.deleted_at = new Date();
    producto.deleted_by = req.usuario.id;


    await producto.save();

    await io.emit('productoEliminado', { producto });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page - 1) * limit;
    const totalProductos = await Producto.countDocuments({ categoria: categoria, deleted: false });
    const totalPages = Math.ceil(totalProductos / limit);

    if (page > totalPages) {
      return res.status(404).json({ error: "Página no encontrada" });
    }
    
    const productos = await Producto.find({ categoria: categoria, deleted: false })
    .skip(skip)
    .limit(limit)
    .sort({ codigo: 1 });;

    if (!productos || productos.length === 0) {
      return res.status(404).json({ error: "Productos no encontrados" });
    }
    
    res.status(200).json({
      productos,
      currentPage: page,
      totalPages,
      totalProductos,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al buscar los productos" });
  }
};

const getProductos = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let codigo = req.query.codigo;

    if(!codigo){
      codigo = "";
    }

    const skip = (page - 1) * limit;
    const totalProductos = await Producto.countDocuments({ deleted: false });
    const totalPages = Math.ceil(totalProductos / limit);

    if (page > totalPages) {
      return res.status(404).json({ error: "Página no encontrada" });
    }

    const productos = await Producto.find({ deleted: false, codigo: { $regex: codigo, $options: 'i' } })
      .skip(skip)
      .limit(limit)
      .sort({ codigo: 1 });

    res.status(200).json({
      productos,
      currentPage: page,
      totalPages,
      totalProductos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar los productos" });
  }
};

const buscarPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;

    const regex = new RegExp(codigo, 'i');

    const productos = await Producto.find({ codigo: regex });

    res.json({ productos });
  } catch (error) {
    console.error('Error al buscar productos por código:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getCascosPorTalla = async (req, res) => {
  try {
    const { categoria } = req.params;
    const page = parseInt(req.query.page);
    const limit = 4;

    const totalProductos = await Producto.countDocuments({ deleted: false, categoria: 'cascos' });
    const totalPages = Math.ceil(totalProductos / 24);

    const tallas = ["XS", "S", "M", "L", "XL", "XXL"];
    const resultadosPorTalla = {};

    for (const talla of tallas) {
      const skip = (page - 1) * limit;
      const productos = await Producto.find({
        categoria: "cascos",
        talla: talla,
        deleted: false,
      })
        .skip(skip)
        .limit(limit)
        .sort({ codigo: 1 });

      resultadosPorTalla[talla] = {
        productos,
        talla: talla,
      };
    }

    res.status(200).json({ resultadosPorTalla, totalProductos, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar los cascos" });
  }
};



module.exports = {
  createProducto,
  updateProducto,
  deleteProducto,
  getProducto,
  getProductos,
  getCategoria,
  buscarPorCodigo,
  getCascosPorTalla
};
