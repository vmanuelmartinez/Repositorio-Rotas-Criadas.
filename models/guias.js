const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GuiaSchema = new Schema({

        nomeGuia: String,

        numeroTelefone: Number,

        disponivel: Boolean
})


module.exports = mongoose.model('Guia', GuiaSchema)