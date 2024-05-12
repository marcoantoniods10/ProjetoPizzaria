//*******************************************************
//UNICSUL - Universidade Cruzeiro do Sul - Santo Amaro
//Curso: CTS Analise e Desenvolvimento de Sistemas
//Disciplina: Topicos Avançados de SI - I
//Autor: Marco Antonio - Data: 13/05/2024
//Descrição: Projeto A2 - Pizzaria dos Cria
//*******************************************************
// Importação dos modulos:
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();

// Criar as rotas / serviços:
app.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if(err){
            res.status(500).send("500 - Erro Interno do Servidor");
        }else{
            res.status(200).type('text/html').send(data);
        }
    })
})

app.get('/cardapio', (req, res) => {
    fs.readFile(path.join(__dirname, 'cardapio.html'), (err, data) => {
        if(err){
            res.status(500).send("500 - Erro Interno do Servidor");
        }else{
            res.status(200).type('text/html').send(data);
        }
    })
})

app.get('/appPizzaria.js', (req, res) => {
    fs.readFile(path.join(__dirname, 'appPizzaria.js'), (err, data) => {
        if(err){
            res.status(500).send("500 - Erro Interno do Servidor");
        }else{
            res.status(200).type('text/javascript').send(data);
        }
    })
})

app.get('/pedido', (req, res) => {
    fs.readFile(path.join(__dirname, 'pedido.html'), (err, data) => {
        if(err){
            res.status(500).send("500 - Erro Interno do Servidor");
        }else{
            res.status(200).type('text/html').send(data);
        }
    })
})

// Configuração do Servidor:
const PORT = 4500;
app.listen(PORT, () =>{
    console.log(`[OK] - Servidor executando em: ${PORT}`);
});
