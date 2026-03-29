// ROTAS PÚBLICAS - CADASTRO E LOGIN
import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = express.Router()


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

router.post('/cadastro', async (req, res)=> {
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
    res.status(500).json({message:"Erro no servidor, tente novamente"})
}
})
// nao se pega o dado password de user


export default router