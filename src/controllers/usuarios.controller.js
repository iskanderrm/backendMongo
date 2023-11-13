const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios.model'); 
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);

//Creación de nuevos administradores
exports.createUser = async (req, res) => {
  try {
    const { nombre, apellido, usuario, password } = req.body;
    const existingUser = await Usuario.findOne({ usuario });
    const createdBy = req.usuario.usuario;
    if (existingUser) {
      res.status(400).json({ message: 'Nombre de usuario no disponible' });
      return;
    }
    const hashedPassword = await bcrypt.hashSync(password, saltosBcrypt);

    const nuevoUsuario = new Usuario({
      nombre: nombre,
      apellido: apellido,
      usuario: usuario,
      password: hashedPassword,
      created_by: createdBy,
    });

    await nuevoUsuario.save();

    res.status(201).json({message: "Usuario creado exitosamente"});
  } catch (error) {
    console.error('Error al crear el usuario', error);  
    res.status(500).json({ message: 'Error al crear el usuario', error: error });
  }
};

// Obtener el usuario por usuario.
exports.getUserByUsername = async (req, res) => {
  try {
    //Recibe el usuario en la URL
    const { username } = req.params;

    const usuario = await Usuario.findOne({ usuario: username });

    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const totalUsuarios = await Usuario.countDocuments({ deleted: false });
    const totalPages = Math.ceil(totalUsuarios / limit);

    if (page > totalPages) {
      return res.status(404).json({ error: 'Página no encontrada' });
    }

    const usuarios = await Usuario.find({ deleted: false })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      usuarios,
      currentPage: page,
      totalPages,
      totalUsuarios,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar los usuarios' });
  }
};

//Edición de usuario por medio de usuario.
exports.updateUser = async (req, res) => {
  try {
    //Por parametro en la URL se manda el usuario y lo que se va a actualizar se recibe del body.
    const { username } = req.params;
    const { nombre, apellido, password } = req.body;
    const updatedBy = req.usuario.usuario;

    const usuario = await Usuario.findOne({ usuario: username, deleted: false });

    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    if (nombre) usuario.nombre = nombre;
    if (apellido) usuario.apellido = apellido;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTOS_BCRYPT));
      usuario.password = hashedPassword;
    }

    usuario.updated_at = new Date();
    usuario.updated_by = updatedBy;

    await usuario.save();

    res.status(200).json({ message: "Usuario actualizado exitosamente."});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const deletedBy = req.usuario.usuario;

    const usuario = await Usuario.findOne({ usuario: username, deleted: false });

    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    usuario.deleted = true;
    usuario.deleted_at = new Date();
    usuario.deleted_by = deletedBy; 

    await usuario.save();

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
