const express = require('express')
const app = express()
const port = 9000
const mongoose = require('mongoose')
const guias = require('./models/guias')
const GuiaSchema = require('./models/guias')
const RoteiroSchema = require('./models/roteiros')
app.use(express.json())

//Conexão com Moongoose

mongoose
        .connect('mongodb+srv://projetoapi:i6FiJaYNLn1OnCzI@apicluster.yknbsfx.mongodb.net/?retryWrites=true&w=majority'
        )
        .then(() => {
                console.log('Conectamos no Servidor!')
                app.listen(9000)
        }).catch((err) => console.log(err))





// Começando criar Guias

app.post("/adicionar/guia", async (req, res) => {
        const Guia = GuiaSchema(req.body) 
        await Guia.save() 
                .then((data) => res.status(201).json({ msg: 'Guia adicionado com sucesso!' }))
                .catch((error) => res.json({ message: error }))
})

// Listar Guias/ endpoint para listar

app.get("/listar/guias", async (req, res) => {
        await GuiaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }))
})

//Obter um guia só por ID

app.get("/listar/guia/:id", async (req, res) => {
        const { id } = req.params; await
        GuiaSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: 'error'}))
});

//Atualizar Guia :)

app.put("/atualizar/guia/:id", async (req, res) => {
        const { id } = req.params; 
        const {nome, numeroTelefone, disponivel } = req.body;
        await GuiaSchema 
        .updateOne({ _id: id }, { $set: {nome,numeroTelefone, disponivel }})
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error}))       
                
});

// Deletando

app.delete("/deletar/guia/:id", async (req, res) =>{
        const { id } = req.params; await
        GuiaSchema 
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({msg: error}))
});

// Segunda parte, Métodos CRUD com Roteiros :)

app.post("/adicionar/roteiro", async (req, res) => {
        const Roteiro = RoteiroSchema(req.body)
        await Roteiro.save()
                .then((data) => res.status(201).json({ msg: 'Roteiro adicionado com succeso!' }))
                .catch((error) => res.json({ message: error }))
})


//Listar os Roteiros

app.get("/listar/roteiros", async (req, res) => {
        await RoteiroSchema
        .find()
        .populate('nomeGuia')
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: error }))})


// Obter Roteiro por ID

app.get("/listar/roteiro/:id", async (req, res) => {
        const { id } = req.params; await
        RoteiroSchema
        .findById(id)
        .populate('nomeGuia')
        .then((data) => res.json(data))
        .catch((error) => res.json({ msg: 'error'}))})

//Atualizar Roteiro

app.put("/atualizar/roteiro/:id", async (req, res) => {
        const { id } = req.params;
        const { nome, dificuldade,
                equipamentos, localizacao, estado } = req.body;
        await RoteiroSchema
                .updateOne({ _id: id }, {
                        $set: {
                                nome, dificuldade,
                                equipamentos, localizacao, estado
                        }
                })
                .then((data) => res.json(data))
                .catch((error) => res.json({ msg: error }))

})


// Deletando Roteiro

app.delete("/deletar/roteiro/:id", async (req, res) =>{
        const { id } = req.params; await
        RoteiroSchema 
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({msg: 'Roteiro Deletado com Sucesso'}))
});

// Inserir guia no roteiro

app.put("/inserir/guia/:id", async (req, res) => {
        const { id } = req.params;
        const { nomeGuia } = req.body;
        const roteiroUpd = await RoteiroSchema
                .findByIdAndUpdate({ _id: id }, {
                        $push: {
                                nomeGuia: nomeGuia
                        }
                })
                .then((data) => res.json({msg: 'Guia inserido com sucesso!'}))
                .catch((error) => res.json({ msg: error }))

})

// Remover guia do roteiro

app.put("/remover/guia/:id", async (req, res) => {
        const { id } = req.params;
        const { nomeGuia } = req.body;
        const roteiroUpd = await RoteiroSchema
                .findByIdAndUpdate({ _id: id }, {
                        $pull: {
                                nomeGuia: nomeGuia
                        }
                })
                .then((data) => res.json({msg: 'Roteiro atualizado com sucesso!'}))
                .catch((error) => res.json({ msg: error }))

})