require("dotenv").config();
require("./src/configs/db.config");

const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');


const http = require('http');
const socketConfig = require('./src/configs/socket.config');
const server = http.createServer(app);
const io = socketConfig.initializeSocket(server);
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());


//  TODO: Importar archivos de rutas
const usuariosRouter = require('./src/routes/usuarios.route');
const authRouter = require('./src/routes/auth.route');
const promocionesRouter = require('./src/routes/promociones.route');
const productosRouter = require('./src/routes/productos.route');

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.set("io", io);

//  TODO: Rutas de ejemplo
app.use('/usuarios', usuariosRouter);
app.use('/auth', authRouter);
app.use('/promociones', promocionesRouter);
app.use('/productos', productosRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("API escuchando en el puerto " + PORT);
});
