// ROTAS PÚBLICAS - CADASTRO E LOGIN
import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jsonWebToken from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()

 const JWT_SECRET = process.env.JWT_SECRET


//Cadastro
/*
router -> instanciando o objeto acima 
.post -> metodo http para envio de formulario 
/cadastro -> é um endpoint, o caminho que precisa ser chamado para essa função ser executado 
(req, res) => { ... } -> é uma arrow fuction que atua como handler, quem resolve o problema. 
ela recebe dois objetos 
req -> que significa request/requisição : recebe tudo que vem de fora, os dados do formulario o IP de quem chamou, os cabeçalhos e etc
res -> que siginifica response/resposta : é o que usamos para enviar de volta exemplo: cadastri realizado com sucesso ou um erro 400
 */

router.post('/cadastro', async(req, res)=> {
    try{
    const user = req.body

    const salt = await bcrypt.genSalt(10) // 
    
    const passwordHash = await bcrypt.hash(user.password, salt)

    const userDB = await prisma.user.create({
        data: {
            email : user.email,
            name : user.name, 
            password: passwordHash,
        },
    })
    res.status(201).json(userDB) //envia resposta ao usuario status ok 
} catch(err){
    res.status(500).json({message:"Erro no servidor, tente novamente(endpoint cadastro)"})
}
})
// nao se pega o dado password de user

// Rota de login - Token JWT para autenticação
// Logica: todo login o usuario ganha um token de autenticação 
// REQUISIÇÃO -> o usuario efetua o login, uma requisição é enviada para o servidor, la as credenciais são verificadas 
// RESPOSTA -> depois da verificação, o servidor retorna a resposta com um token, toda vez que o usuario fizer uma requisição para o back end para acessar uma rota privada a identificação e permição se dar pelo token 
// Token : ele é separado em trÊs partes: header, payload e signature 

router.post('/login', async(req, res)=>{
    
   try{
     const userInfor= req.body
    // Busca usuario no banco de dados
     const user = await prisma.user.findUnique({
        where: {email: userInfor.email},
    })
    // Verifica se o usuario existe dentro do banco de dados
    if(!user){
        return res.status(404).json({message:'Usuário não encontrado '})
    }

    // Compara senha do banco com a que o usuario digitou
    const isMatch = await bcrypt.compare(userInfor.password, user.password)
    if(!isMatch){
        return res.status(400).json({messsage: 'senha Invalida'})

    }
    // gerar o token de JWT
    //CAMADA EXTRA DE SEGURANÇA : secret -> é dado na hora que é gerado o token(criptografar) e na hora de descripitografar e verificar se é valido 
    const token = jsonWebToken.sign({id: user.id}, JWT_SECRET,{expiresIn: '1d'}) //tempo de duração do token
     res.status(200).json({ token })

   } catch(err){
    console.log(err)
    res.status(500).json({message:' Erro no servidor, tente novamente(endpoint login)'})

   }


})
//Rota de login
// prisma.user.findUnique -> no prisma em busca de um unico usuario
//where: {email: userInfor.email} -> por onde porcurar essas informações, neste caso, pelo email pelo  const userInfor= req.body

export default router