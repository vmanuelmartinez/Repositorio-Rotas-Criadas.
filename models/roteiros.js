const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoteiroSchema = new Schema({

    nome: {type: String,
    required: true },

    nomeGuia: {type: String,
    required: true },

    dificuldade: {type: Number,
    required: true},

    equipamentos: {type: Array,
    required: true },

    localizacao: {type: 
        String, 
    required: true },

    estado: {type: String, required: true}
})

module.exports = mongoose.model('Roteiro', RoteiroSchema)