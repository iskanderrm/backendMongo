require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios.model');
const url_mongo = process.env.URL_MONGODB;                 
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);  

mongoose.connect(url_mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    seedUsuarios();
  })
  .catch(console.error);

const seedUsuarios = async () => {
  try {
    await Usuario.deleteMany({});

    const usuariosDePrueba = [];
    for (let i = 1; i <= 10; i++) {
      const nombre = `Usuario${i}`;
      const apellido = `Apellido${i}`;
      const usuario = `usuario${i}`;
      const password = `password${i}`;
      const hashedPassword = await bcrypt.hashSync(password, saltosBcrypt);

      const nuevoUsuario = new Usuario({
        nombre,
        apellido,
        usuario,
        password: hashedPassword,
        created_by: 'Seeder',
      });

      usuariosDePrueba.push(nuevoUsuario);
    }

    await Usuario.insertMany(usuariosDePrueba);

    console.log("Usuarios de prueba insertados exitosamente.");


    mongoose.connection.close();
  } catch (error) {
    console.error('Error al insertar usuarios de prueba', error);
  }
};
