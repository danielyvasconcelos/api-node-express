//import express from 'express' -> essa é a versão utlizada na auça, porém não funcionou
/*O Node 24 já suporta ES Modules normalmente. 
O problema é que em package.json:10 o projeto estava definido como CommonJS com type: "commonjs", enquanto server.js:1 usava import express from 'express'. 
Nessa combinação, o Node interpreta o arquivo como CommonJS e rejeita import com o erro “Cannot use import statement outside a module”. */
const express = require("express") //-> antigamente as importanções eram assim 

const app = express() // objeto que cria uma instancia do express

//console.log("1,2,3 testando")

//Desenvolver 3 rotas 

 //01 - rota para o usuario logar
 //02- rota para o usuario cadastrar
 //03 - Listar usuario 
//chamada de metodo 
app.listen(3000, ()=> console.log("Servidor Rodando, Daniely 🦋")) // função de escuta e direciona para rotas para a port 3000
