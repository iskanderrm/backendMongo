const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
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
});

module.exports = mongoose.model('Usuarios', usuarioSchema);
