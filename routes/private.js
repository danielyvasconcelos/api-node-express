import { PrismaClient } from '@prisma/client/extension'
import express from 'express'

// rota privada para o token 
const router = express.Router()
const prisma = new PrismaClient()

// endpoint get - pegar
router.get('/listar-usuarios', async(req, res)=>{
    try{
        //tras todos os usuario mas omite a senha 
        const users = await prisma.user.findMany({omit: {password: true}})

        res.status(300).json({message: 'Usuários listados com suceso', users})
       
    }catch{
        res.status(500).json({message: 'Erro no servidor, tente noamento (endpoint listar-usuario)'})
    }

})

export default rputer