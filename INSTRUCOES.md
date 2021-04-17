# INSTRUÇÕES

## Configurando o projeto

### ENV

Copie o arquivo `.env.example` para um `.env` e prencha os campos vazios.

```shell
cp .env.example .env
```

Exemplo do `.env`:

```env
MONGO_SERVER=localhost
MONGO_DATABASE=desafio-backend-nodejs

JWT_PK=chave-privada-do-jwt
PASS_ALT=melhora-o-hash-da-senha
```

### Banco de dados

Para o desafio eu optei por utilizar o banco de dados mongodb.

Para criar o banco de dados localmente, use os comandos:

```shell
$ mongod

$ mongo
```

Dentro do mongo shell use:

```
> use desafio-backend-nodejs
```

Pronto, o banco está criado.

### Instalando as dependencias

Para instalar as dependencias, execute o comando:

```shell
$ npm install
```

## Rodando o projeto

Para iniciar a API, execute o comando:

```shell
$ npm run start
```

Executando testes:

```shell
$ npm run test
```

## Rotas

### Auth

Endpoint:
```shell
POST: /auth
```

Body:
```json
{
	"cpf": "cpf",
	"password": "password"
}
```

> Para autenticar um usuário, ele dever existir no banco de dados antes.
> Use a rota de criação de usuário para fazer isso.

> O token é valido por 24 horas.

### Users

Todas as rotas de usuário, exceto a de criação, precisam de um token de autorização
para funcionar, o token é fornecido pela rota `/auth` [(documentação acima)](#auth).

O token de autorização pode ser usado nos headers da requisição:
```shell
Authorization: Bearer <token>
```

Mas também pode ser configurado como uma variavel no postman, nomeada como `token`.

#### Criar usuário

Endpoint:
```shell
POST: /users
```

Body:
```json
{
	"cpf": "cpf",
	"password": "password",
	"role": "ADMIN | SELLER"
}
```

#### Buscar usuário (Apenas admins)

Endpoint:
```shell
GET: /users/:cpf
```

#### Buscar usuários (Apenas admins)

Endpoint:
```shell
GET: /users
```

#### Editar usuário (Apenas admins)

Endpoint:
```shell
PUT: /users/:cpf
```

Body:
```json
{
	"password": "password",
	"role": "ADMIN | SELLER",
	"permissions": ["...permissions"]
}
```

> Se a permissão que for informada no array de permissions já existir no usuário, ela é deletada.

#### Remover usuário (Apenas admins)

Endpoint:
```shell
DELETE: /users/:cpf
```
