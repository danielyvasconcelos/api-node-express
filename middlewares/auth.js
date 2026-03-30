import jsonWebToken from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

//middlewares - passa por ele antes da rota privada, ou continua ou ele barra
// res -> resposta
// req -> requisição
// next -> 
const auth = (req, res, next)=>{
    //postman auth / bearer
    console.log(req)
    console.log(res)
    console.log(next)

    const token = req.headers.authorization
    
    console.log(token)

    if(!token){
        return res.status(401).json({message: 'Acesso Negado'})
    }

    try{                            // metodo verify
        const decoded = jsonWebToken.verify(token.replace('Bearer ', ''), JWT_SECRET)  // replace procura o bearer com espaço e subtitui por nada 
        console.log(decoded)
        req.userId = decoded.id
        
    }catch(err){
        return res.status(401).json({message: 'Token invalido (auth)'})

    }

    next()
}
