const Promocion = require('../models/promocion.model');
const fs = require('fs');
const socket = require("../configs/socket.config");
const io = socket.getIo()

const createPromocion = async (req, res) => {
  try {
    const { id_nombre_promocion } = req.body;
    const url_imagen_promocion = req.file.filename; 
    const existigPromotion = await Promocion.findOne({ id_nombre_promocion });
    const created_by = req.usuario.id;
    if (existigPromotion) {
      res.status(400).json({ message: 'ID de la promoción no disponible' });
      return;
    }
    const promocion = new Promocion({
      id_nombre_promocion,
      url_imagen_promocion,
      created_by,
    });
    await io.emit('promocionCreada', { promocion });

    await promocion.save();



    res.status(201).json({message: "Promociones agregada exitosamente"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear la promociones.' });
  }
};

const updatePromocion = async (req, res) => {
  try {
    const { id_nombre_promocion } = req.params;
    

    const promocion = await Promocion.findOne({ id_nombre_promocion, deleted: false });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }
    fs.unlinkSync(`public/images/${promocion.url_imagen_promocion}`);


    promocion.url_imagen_promocion = req.file.filename;
    promocion.updated_at = new Date();
    promocion.updated_by = req.usuario.id;

    await promocion.save();
    await io.emit('promocionActualizada', { promocion });
    res.status(200).json({message: "Promoción actualizada correctamente"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al actualizar la promoción.' });
  }
};

const deletePromocion = async (req, res) => {
  try {
    const { id_nombre_promocion } = req.params;
    const deleted_by = req.usuario.id;
    const promocion = await Promocion.findOne({ id_nombre_promocion, deleted: false });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }

    promocion.deleted = true;
    promocion.deleted_at = new Date();
    promocion.deleted_by = deleted_by;

    await promocion.save();
    await io.emit('promocionEliminada', { promocion });

    res.status(200).json({ message: "Promoción eliminada exitosamente."});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al eliminar la promoción.' });
  }
};

const getPromocion = async (req, res) => {
  try {
    const { id_nombre_promocion } = req.params;
    const promocion = await Promocion.findOne({ id_nombre_promocion });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }

    res.status(200).json(promocion);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la promoción.' });
  }
};

const getPromociones = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const totalPromociones = await Promocion.countDocuments({ deleted: false });
    const totalPages = Math.ceil(totalPromociones / limit);

    if (page > totalPages) {
      return res.status(404).json({ error: 'Página no encontrada.' });
    }

    const promociones = await Promocion.find({ deleted: false })
      .skip(skip)
      .limit(limit)
      .sort({ codigo: 1 });

    res.status(200).json({
      promociones,
      currentPage: page,
      totalPages,
      totalPromociones,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar las promociones.' });
  }
};

module.exports = {
  createPromocion,
  updatePromocion,
  deletePromocion,
  getPromocion,
  getPromociones,
};

  

module.exports = {
  createPromocion,
  updatePromocion,
  deletePromocion,
  getPromocion,
  getPromociones
};
