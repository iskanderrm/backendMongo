const io = require("socket.io-client");
const socket = io("http://localhost:8081");
socket.on('connect', () => {
  console.log('Conectado al servidor');
  
  socket.on('productoCreado', (data) => {
    console.log('Nuevo producto creado:', data.nuevoProducto);
  });

  socket.on('productoActualizado', (data) => {
    console.log('Producto actualizado:', data.producto);
  });

  socket.on('productoEliminado', (data) => {
    console.log('Producto eliminado:', data.producto);
  });
});
