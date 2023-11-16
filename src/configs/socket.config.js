const socketIo = require('socket.io');

let io;

function initializeSocket(server) {
  io = socketIo(server);

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
