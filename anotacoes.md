# Anotacoes - API Node + Express + Prisma

## 1) Setup inicial
```bash
npm init -y
npm install express
```

Comando para rodar em modo watch:
```bash
node --watch server.js
```

Documentacao do Express:
https://expressjs.com/pt-br/5x/api.html

## 2) Rotas da aula
Desenvolver 3 rotas:

- Rotas publicas
    - 01 - Cadastro
    - 02 - Login
- Rotas privadas
    - 03 - Listar usuario

## 3) Observacao sobre import/export (Node)
Exemplo usado na aula:
```js
import express from 'express'
```

No Node 24, se ocorrer erro com `import`, verificar o [package.json](package.json):

- Se estiver com `"type": "commonjs"`, `import` pode falhar.
- Para usar `import/export`, usar `"type": "module"`.

## 4) MongoDB
Usuario: obviamente nao rei explanar kskksksks

Senha: aqui tambem nao 

Connection string: e nem aqui, beijos 

## 5) Prisma
Documentacao:
https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb#3-connect-your-database

Comandos:
```bash
npm install prisma --save-dev
npx prisma init
npm install @prisma/client
npx prisma db push
npx prisma studio
```

## 6) Bcrypt
Documentacao:
https://www.npmjs.com/package/bcrypt

Instalacao:
```bash
npm install bcrypt
```

## 7) Tratamento de erro
Usar `try` e `catch` nas rotas assincronas.