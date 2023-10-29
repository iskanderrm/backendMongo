const Promocion = require('../models/promociones.model');

const createPromocion = async (req, res) => {
  try {
    const { id_nombre_promocion, created_by } = req.body;
    const url_imagen_promocion = req.file.filename; 

    const promocion = new Promocion({
      id_nombre_promocion,
      url_imagen_promocion,
      created_by,
    });

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
    const { updated_by } = req.body;
    

    const promocion = await Promocion.findOne({ id_nombre_promocion, deleted: false });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }

    promocion.url_imagen_promocion = req.file.filename;
    promocion.updated_at = new Date();
    promocion.updated_by = updated_by;

    await promocion.save();

    res.status(200).json({message: "Promoción actualizada correctamente"});
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la promoción.' });
  }
};

const deletePromocion = async (req, res) => {
  try {
    const { id_nombre_promocion, deleted_by} = req.params;

    const promocion = await Promocion.findOne({ id_nombre_promocion, deleted: false });

    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada.' });
    }

    promocion.deleted = true;
    promocion.deleted_at = new Date();
    promocion.deleted_by = deleted_by;

    await promocion.save();

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
      const promocion = await Promocion.find({ deleted: false });
  
      if (!promocion) {
        return res.status(404).json({ error: 'No hay promociones guardadas.' });
      }
  
      res.status(200).json(promocion);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar la promoción.' });
    }
  };
  

module.exports = {
  createPromocion,
  updatePromocion,
  deletePromocion,
  getPromocion,
  getPromociones
};
