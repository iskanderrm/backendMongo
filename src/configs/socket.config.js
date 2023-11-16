const socketIo = require('socket.io');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Permite solicitudes solo desde este origen
      methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  return io;
}

function getIo() {
  if (!io) {
    throw new Error('Socket.IO no inicializado');
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIo,
};
