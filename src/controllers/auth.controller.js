const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarios.model');
const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const {usuario, password} = req.body;

        const usuarioEncontrado = await usuarioModel.findOne({usuario});
        if (!usuarioEncontrado) {
            return res.status(400).json({
                message: "Usuario o password incorrecto"
            });
        }

        const passwordCorrecto = bcrypt.compareSync(password, usuarioEncontrado.password);
        if (!passwordCorrecto) {
            return res.status(400).json({
                message: "Usuario o password incorrecto"
            });
        }

        const payload = {
            usuario: {
                usuario: usuarioEncontrado.usuario
            }
        }
        const token = jwt.sign(payload, jwtSecret, {expiresIn: '2h'});

        return res.status(200).json({
            message: "Acceso correcto",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Ocurrió un error al validar credenciales",
            error: error.message
        });
    }
}

module.exports = {
    login
}