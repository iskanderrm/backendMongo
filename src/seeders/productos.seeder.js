const mongoose = require('mongoose');
const Producto = require('../models/productos.model'); 
require("dotenv").config();

mongoose.connect(process.env.URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

const productosData = [
  {
    codigo: 'P1001',
    modelo: 'Modelo 1',
    marca: 'Marca 1',
    url_imagen: 'imagen1.jpg',
    tipo_producto: { atributo1: 'Valor1', atributo2: 'Valor2' },
    created_by: "admin"
  },
  {
    codigo: 'P1002',
    modelo: 'Modelo 2',
    marca: 'Marca 2',
    url_imagen: 'imagen2.jpg',
    tipo_producto: { categoria: 'Maletas', atributo2: 'Valor4' },
    created_by: "admin"
  },
  {
    codigo: 'P1003',
    modelo: 'Modelo 3',
    marca: 'Marca 3',
    url_imagen: 'imagen3.jpg',
    tipo_producto: { categoria: 'Maletas', atributo2: 'Valor6' },
    created_by: "admin"
  },
  {
    codigo: 'P1004',
    modelo: 'Modelo 4',
    marca: 'Marca 4',
    url_imagen: 'imagen4.jpg',
    tipo_producto: { categoria: 'Cascos', atributo2: 'Valor8' },
    created_by: "admin"
  },
  {
    codigo: 'P1005',
    modelo: 'Modelo 5',
    marca: 'Marca 5',
    url_imagen: 'imagen5.jpg',
    tipo_producto: { categoria: 'Cascos', atributo2: 'Valor10' },
    created_by: "admin",
  },
];

async function seedProductos() {
  try {
    await Producto.deleteMany(); 

    for (const producto of productosData) {
      const nuevoProducto = new Producto(producto);
      await nuevoProducto.save();
    }

    console.log('Datos de productos agregados exitosamente');
  } catch (error) {
    console.error('Error al agregar datos de productos:', error);
  } finally {
    mongoose.connection.close(); 
  }
}

seedProductos();
