const mongoose = require('mongoose');

const productosSchema = mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
      },
      modelo: {
        type: String,
        required: false,
        default: null
      },
      marca: {
        type: String,
        required: false,
        default: null
      },
      url_imagen: {
        type: String,
        required: true,
        default: null
      },
      //---------------------
      categoria: {
        type: String,
        required: true,
        default: null,
      },
      talla: {
        type: String,
        required: false,
        default: null,
      },
      capacidad: {
        type: String,
        required: false,
        default: null,
      },
      tipo_llanta: {
        type: String,
        required: false,
        default: null,
      },
      rin: {
        type: String,
        required: false,
        default: null,
      },
      medida: {
        type: String,
        required: false,
        default: null,
      },
      descripcion: {
        type: String,
        required: false,
        default: null,
      },
      compatibilidad: {
        type: String,
        required: false,
        default: null,
      },
      color: {
        type: String,
        required: false,
        default: null,
      },
      //---
      created_at: {
        type: Date,
        required: false,
        default: new Date(),
    },
    created_by: {
        type: String,
        default: null,
    },
    updated_at: {
        type: Date,
        default: null,
    },
    updated_by: {
        type: String,
        default: null,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deleted_at: {
        type: Date,
        default: null,
    },
    deleted_by: {
        type: String,
        default: null,
    },
})

module.exports = mongoose.model('Productos', productosSchema);
