import express from 'express' //-> essa é a versão utlizada na aula, porém não funcionou, troquei por type module
import publicRoutes from './routes/public.js'

//const express = require("express") //-> antigamente as importanções eram assim 

const app = express() // objeto que cria uma instancia do express

app.use(express.json()) // avisando que vou usar json

//console.log("1,2,3 testando")
// '/' -> acesso direto ao cadastro

app.use('/', publicRoutes)


//chamada de metodo 
app.listen(3000, ()=> console.log("Arassou, ta rodando 💅💅🦋🌸✨🐬")) // função de escuta e direciona para rotas para a port 3000


