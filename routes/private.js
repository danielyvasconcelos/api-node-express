import { PrismaClient } from '@prisma/client'
import express from 'express'
import auth from '../middlewares/auth.js'

// rota privada para o token 
const router = express.Router()
const prisma = new PrismaClient()

// endpoint get - pegar
router.get('/listar-usuarios', auth, async(req, res)=>{
    try{
        //tras todos os usuario mas omite a senha 
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
            },
        })

        res.status(200).json({message: 'Usuários listados com suceso', users})
       
    }catch{
        res.status(500).json({message: 'Erro no servidor, tente noamento (endpoint listar-usuario)'})
    }

})

export default router