const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;


const verificarJWT = (req, res, next) => {
    const token = req.get('Authorization');

    jwt.verify(token, jwtSecret, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "Error al validar token",
                error: err.message
            });
        }

        req.usuario = decode.usuario;
        next();
    })
};


module.exports = {
    verificarJWT
}