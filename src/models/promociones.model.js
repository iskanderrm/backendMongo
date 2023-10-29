const mongoose = require('mongoose');

const promocionesSchema = mongoose.Schema({
    id_nombre_promocion: {
        type: String,
        required: true
    },
    url_imagen_promocion: {
        type: String,
        required: true
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

module.exports = mongoose.model('Promociones', promocionesSchema);