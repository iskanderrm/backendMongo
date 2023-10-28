require("dotenv").config();
require("./src/configs/db.config");

const express = require("express");
const app = express();
//  TODO: Importar archivos de rutas
const usuariosRouter = require('./src/routes/usuarios.route');
const authRouter = require('./src/routes/auth.route');

app.use(express.json());

//  TODO: Ruta de ejemplo
app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("API escuchando en el puerto " + PORT);
});
