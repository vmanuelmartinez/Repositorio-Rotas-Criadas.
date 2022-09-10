const express = require('express')
const app = express()
const port = 9000
const mongoose = require('mongoose')
const GuiaSchema = require('./models/guias')
const RoteiroSchema = require('./models/roteiros')
app.use(express.json())
                     //Conexão com Moongoose.
mongoose
        .connect('mongodb+srv://vmmanuelmartinez:senhadocluster@clusterapi.1alpov9.mongodb.net/?retryWrites=true&w=majority'
        )
        .then(() => {
                console.log('Conectamos no Atlas!')
                app.listen(9000)
        }).catch((err) => console.log(err))





// Começando criar Guias
app.post("/guias", async (req, res) => {
        const Guia = GuiaSchema(req.body) 
        await Guia.save() 
                .then((data) => res.status(201).json({ msg: 'Guia Criado com sucesso!' }))
                .catch((error) => res.json({ message: error }))
})

// Listar Guias/ endpoint para listar.
app.get("/guias", async (req, res) => {
        await GuiaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }))
})

//Obter um guia só por ID.
app.get("/guias/:id", async (req, res) => {
        const { id } = req.params; await
        GuiaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: 'error'}))
});

//Atualizar Guia: :)

app.put("/guias/:id", async (req, res) => {
        const { id } = req.params; 
        const {nome, numeroTelefone, disponivel } = req.body;
        await GuiaSchema 
        .updateOne({ _id: id }, { $set: {nome,numeroTelefone, disponivel }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error}))       
                
});

// Deletando
app.delete("/guias/:id", async (req, res) =>{
        const { id } = req.params; await
        GuiaSchema 
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({msg: error}))
});

// Segunda parte, Métodos CRUD com Roteiros :)
app.post("/roteiro", async (req, res) => {
        const Roteiro = RoteiroSchema(req.body)
        await Roteiro.save()
                .then((data) => res.status(201).json({ msg: 'Roteiro adicionado com succeso!' }))
                .catch((error) => res.json({ message: error }))
})


//Listar os Roteiros.
app.get("/roteiro", async (req, res) => {
        await RoteiroSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }))})


// Obter Roteiro por ID.
app.get("/roteiro/:id", async (req, res) => {
        const { id } = req.params; await
        RoteiroSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: 'error'}))})

//Atualizar Roteiro:

app.put("/roteiro/:id", async (req, res) => {
        const { id } = req.params;
        const { nome, nomeGuia, dificuldade,
                equipamentos, localizacao, estado } = req.body;
        await RoteiroSchema
                .updateOne({ _id: id }, {
                        $set: {
                                nome, nomeGuia, dificuldade,
                                equipamentos, localizacao, estado
                        }
                })
                .then((data) => res.json(data))
                .catch((error) => res.json({ msg: error }))

})


// Deletando Roteiro
app.delete("/roteiro/:id", async (req, res) =>{
        const { id } = req.params; await
        RoteiroSchema 
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({msg: 'Roteiro Deletado com Sucesso'}))
});

