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
    categoria: 'Cascos',
    talla: 'XL',
    capacidad: null,
    tipo_llanta: null,
    rin: null,
    medida: null,
    descripcion: null,
    compatibilidad: null,
    color: null,
    created_by: "Seeder"
  },
  {
    codigo: 'P1002',
    modelo: 'Modelo 2',
    marca: 'Marca 2',
    url_imagen: 'imagen2.jpg',
    categoria: 'Maletas',
    talla: null,
    capacidad: '30L',
    tipo_llanta: null,
    rin: null,
    medida: null,
    descripcion: null,
    compatibilidad: null,
    color: null,
    created_by: "Seeder"
  },
  {
    codigo: 'P1003',
    modelo: 'Modelo 3',
    marca: 'Marca 3',
    url_imagen: 'imagen3.jpg',
    categoria: 'Llantas',
    talla: null,
    capacidad: null,
    tipo_llanta: 'Deportivas',
    rin: '17',
    medida: '205/55R17',
    descripcion: null,
    compatibilidad: null,
    color: null,
    created_by: "Seeder"
  },
  {
    codigo: 'P1004',
    modelo: 'Modelo 4',
    marca: 'Marca 4',
    url_imagen: 'imagen4.jpg',
    categoria: 'Accesorios',
    talla: null,
    capacidad: null,
    tipo_llanta: null,
    rin: null,
    medida: null,
    descripcion: 'Descripción del accesorio',
    compatibilidad: 'Modelos X, Y, Z',
    color: null,
    created_by: "Seeder"
  },
  {
    codigo: 'P1005',
    modelo: 'Modelo 5',
    marca: 'Marca 5',
    url_imagen: 'imagen5.jpg',
    categoria: 'Equipo Personal',
    talla: 'M',
    capacidad: null,
    tipo_llanta: null,
    rin: null,
    medida: null,
    descripcion: null,
    compatibilidad: null,
    color: 'Azul',
    created_by: "Seeder",
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
