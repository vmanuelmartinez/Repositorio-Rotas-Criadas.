const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GuiaSchema = new Schema({
        nome: { type: String, 
        required: true} ,

        numeroTelefone: { type: Number, 
        required: true },

        disponivel: {type: Boolean}
})


module.exports = mongoose.model('Guia', GuiaSchema)