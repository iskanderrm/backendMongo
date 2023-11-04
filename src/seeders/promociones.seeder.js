const mongoose = require('mongoose');
require("dotenv").config();
const Promocion = require('../models/promociones.model'); 

mongoose.connect(process.env.URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

const promocionesData = [
  {
    id_nombre_promocion: 'Promocion1',
    url_imagen_promocion: 'imagen1.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion2',
    url_imagen_promocion: 'imagen2.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion3',
    url_imagen_promocion: 'imagen3.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion4',
    url_imagen_promocion: 'imagen4.jpg',
    created_by: "Seeder"
  },
  {
    id_nombre_promocion: 'Promocion5',
    url_imagen_promocion: 'imagen5.jpg',
    created_by: "Seeder"
  },
];

async function seedPromociones() {
  try {
    await Promocion.deleteMany(); 

    for (const promocion of promocionesData) {
      const nuevaPromocion = new Promocion(promocion);
      await nuevaPromocion.save();
    }

    console.log('Datos de promociones agregados exitosamente');
  } catch (error) {
    console.error('Error al agregar datos de promociones:', error);
  } finally {
    mongoose.connection.close(); 
  }
}

seedPromociones();
