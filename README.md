# API Node + Express + Prisma

## Proposito
Este projeto foi criado para estudo e revisao da construcao de uma API com Node.js, Express, Prisma e MongoDB.

O foco principal e praticar conceitos como:

- criacao de rotas publicas e privadas
- cadastro e login de usuarios
- hash de senha com bcrypt
- autenticacao com JWT
- integracao com MongoDB usando Prisma

## Status do projeto
Projeto de estudo em desenvolvimento, usado para acompanhar aulas e praticar implementacoes passo a passo.

## Tecnologias utilizadas
- Node.js
- Express
- Prisma ORM
- MongoDB Atlas
- bcrypt
- jsonwebtoken

## Estrutura principal
- [server.js](server.js): inicializacao do servidor e registro das rotas
- [routes/public.js](routes/public.js): rotas publicas, como cadastro e login
- [routes/private.js](routes/private.js): rotas privadas protegidas por autenticacao
- [middlewares/auth.js](middlewares/auth.js): middleware para validacao do token JWT
- [prisma/schema.prisma](prisma/schema.prisma): schema do banco de dados
- [.env](.env): variaveis de ambiente do projeto

## Pre-requisitos
Antes de executar o projeto, voce precisa ter instalado:

- Node.js
- npm
- conta e cluster no MongoDB Atlas

## Instalacao
Clone o repositorio e instale as dependencias:

```bash
npm install
```

## Variaveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as variaveis necessarias:

```env
DATABASE_URL="sua_string_de_conexao_mongodb"
JWT_SECRET="sua_chave_secreta_jwt"
```

Observacoes:
- `DATABASE_URL`: string de conexao do MongoDB Atlas
- `JWT_SECRET`: chave usada para assinar e validar os tokens JWT
- o arquivo `.env` nao deve ser enviado para o GitHub

## Prisma
Comandos principais usados no projeto:

```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

Descricao rapida:
- `prisma generate`: gera o client do Prisma
- `prisma db push`: sincroniza o schema com o banco
- `prisma studio`: abre interface visual do banco quando suportado pela conexao/versao usada

## Como executar
Para iniciar a API:

```bash
node server.js
```

Para desenvolvimento com recarga automatica:

```bash
node --watch server.js
```

Servidor padrao:
- porta `3000`

## Rotas previstas
### Rotas publicas
- `POST /cadastro`
- `POST /login`

### Rotas privadas
- `GET /listar-usuarios`

## Exemplo de requisicao
### Cadastro
```http
POST /cadastro
Content-Type: application/json
```

```json
{
	"email": "usuario@email.com",
	"name": "Daniely",
	"password": "123456"
}
```

### Login
```http
POST /login
Content-Type: application/json
```

```json
{
	"email": "usuario@email.com",
	"password": "123456"
}
```

### Rota privada
```http
GET /listar-usuarios
Authorization: Bearer SEU_TOKEN
```

## Conceitos praticados
- organizacao de rotas
- uso de middleware
- autenticacao baseada em token
- protecao de rotas privadas
- persistencia de dados com Prisma
- integracao com banco MongoDB

## Observacoes importantes
- este projeto tem finalidade educacional
- o codigo pode mudar conforme o andamento das aulas
- em caso de erro de conexao com MongoDB Atlas, verificar IP liberado, usuario, senha e string de conexao

## Autor
Projeto desenvolvido para estudo por Daniely Vasconcelos.