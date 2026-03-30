# Anotacoes - API Node + Express + Prisma

## 1) Objetivo do projeto
Criar uma API com:

- cadastro de usuario
- login com JWT
- rota privada para listar usuarios

## 2) Stack usada
- Node.js
- Express
- Prisma
- MongoDB Atlas
- bcrypt
- jsonwebtoken

## 3) Setup inicial
```bash
npm init -y
npm install express
```

Rodar o servidor em modo watch:
```bash
node --watch server.js
```

Documentacao do Express:
https://expressjs.com/pt-br/5x/api.html

## 4) Modulos no Node
O projeto usa `import/export`, entao no [package.json](package.json) precisa estar:

```json
"type": "module"
```

Se estiver como `commonjs`, o Node pode retornar erro com `import`.

Exemplo:
```js
import express from 'express'
```

## 5) Estrutura atual do projeto
- [server.js](server.js): ponto de entrada da API
- [routes/public.js](routes/public.js): rotas publicas
- [routes/private.js](routes/private.js): rotas privadas
- [middlewares/auth.js](middlewares/auth.js): middleware de autenticacao
- [prisma/schema.prisma](prisma/schema.prisma): schema do banco
- [.env](.env): variaveis de ambiente

## 6) Rotas da aula
Rotas publicas:

- `POST /cadastro`
- `POST /login`

Rotas privadas:

- `GET /listar-usuarios`

## 7) Fluxo das rotas
### Cadastro
1. Recebe `email`, `name` e `password`.
2. Gera hash da senha com bcrypt.
3. Salva usuario no banco com Prisma.

### Login
1. Recebe `email` e `password`.
2. Busca usuario pelo email.
3. Compara senha digitada com senha hash do banco.
4. Se estiver correta, gera token JWT.

### Rota privada
1. Recebe token no header `Authorization`.
2. Middleware valida o token.
3. Se o token for valido, libera acesso.

## 8) Prisma + MongoDB
Documentacao:
https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb#3-connect-your-database

Comandos principais:
```bash
npm install prisma --save-dev
npx prisma init
npm install @prisma/client
npx prisma generate
npx prisma db push
npx prisma studio
```

Observacao:
- `db push` sincroniza o schema com o banco.
- se o model mudar, rodar `npx prisma db push` novamente.

## 9) Schema atual
Model principal:

```prisma
model User {
    id       String @id @default(auto()) @map("_id") @db.ObjectId
    email    String @unique
    name     String?
    password String
    posts    Post[]
}
```

## 10) Bcrypt
Documentacao:
https://www.npmjs.com/package/bcrypt

Instalacao:
```bash
npm install bcrypt
```

Uso:
- `bcrypt.hash()` para gerar hash da senha
- `bcrypt.compare()` para comparar senha digitada com hash salvo

## 11) JWT
Documentacao:
https://www.jwt.io/

Instalacao:
```bash
npm install jsonwebtoken
```

Ideia principal:
- no login, o servidor gera um token
- o cliente envia esse token nas rotas privadas
- o middleware valida o token antes de liberar acesso

Gerar uma chave secreta aleatoria:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Observacao:
- `iat` = instante em que o token foi criado
- `exp` = instante de expiracao
- ambos aparecem em formato Unix timestamp

## 12) Variaveis de ambiente
Exemplos usados no projeto:

- `DATABASE_URL`
- `JWT_SECRET`

Importante:
- o arquivo `.env` deve ficar no `.gitignore`
- nunca subir senha ou connection string para o GitHub

## 13) Tratamento de erro
Usar `try/catch` nas rotas assincronas.

Exemplo de casos comuns:
- erro ao conectar no MongoDB Atlas
- usuario nao encontrado
- senha invalida
- token invalido

## 14) Testes no Postman
### Cadastro
Metodo:
```http
POST /cadastro
```

Body:
```json
{
    "email": "teste@email.com",
    "name": "Daniely",
    "password": "123456"
}
```

### Login
Metodo:
```http
POST /login
```

Body:
```json
{
    "email": "teste@email.com",
    "password": "123456"
}
```

### Rota privada
Metodo:
```http
GET /listar-usuarios
```

Header:
```http
Authorization: Bearer SEU_TOKEN
```

## 15) Erros que ja apareceram no projeto
### `Cannot use import statement outside a module`
Causa:
- projeto estava como CommonJS

Correcao:
- usar `"type": "module"` no [package.json](package.json)

### Prisma nao reconhecia `password`
Causa:
- o campo nao existia no schema ou o client nao tinha sido regenerado

Correcao:
```bash
npx prisma generate
npx prisma db push
```

### `Server selection timeout` no MongoDB
Causa mais comum:
- problema de conexao com o Atlas
- IP nao liberado
- usuario/senha incorretos

## 16) Checklist rapido
Sempre que algo quebrar, revisar nesta ordem:

1. `package.json` com `"type": "module"`
2. `.env` com `DATABASE_URL` e `JWT_SECRET`
3. `npx prisma generate`
4. `npx prisma db push`
5. `node server.js`
6. testar no Postman