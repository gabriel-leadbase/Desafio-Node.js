# Instruções para rodar a aplicação

## Pré-requisitos

É muito importante em que sua máquina local tenha os requisitos abaixo para executar todas as funcionalidades do projeto:

- [Docker](https://docs.docker.com/engine/install/debian/)
- [Docker-Compose](https://docs.docker.com/compose/install/)
- [NodeJs](https://github.com/nodesource/distributions/blob/master/README.md)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Comandos para rodar o projeto

- cp .env.example .env
- yarn
- docker-compose up -d
- yarn dev:migrations
- yarn dev:server

## Comandos para testar a API

- yarn test:migrations
- yarn test:server

## Usuários de testes

**Usuário1**

```
- Nome: Bento Cauã Campos
- CPF: 56912833675
- Senha: 123123
- Papel: Admin
```

**Usuário2**

```
  - Nome: Juliana Débora Malu Aragão
  - CPF: 76154589433
  - Senha: 123123
  - Papel: Usuário
```

## Principais Rotas

_Abaixo estão listadas as principais rotas para atender as funcionalidade dos sistemas, mas também foi criado algumas rotas complementares como "listar todos usuário e retornar informações do usuário específico"_

Cadastrar um novo usuário

```
curl -X POST -H "Content-Type: application/json" \
 -d '{"name":"Fulano da Silva","cpf":"11122233344","password":"123123"}' \
 http://localhost:3333/users
```

Criar autenticação _"sessão"_ de usuário

```
curl -X POST -H "Content-Type: application/json" \
 -d '{"cpf":"11122233344","password":"123123"}' \
 http://localhost:3333/sessions
```

Anexar nova permissão ao usuário

```
curl -X POST -H "Content-Type: application/json" \
-H "Authorization: Bearer token123234" \
 -d '{"name":"VISUALIZAR"}' \
 http://localhost:3333/users/ae2598a1-51c9-44f1-ab1d-f764ebf3c16c/permissions
```

Remover permissão específica do usuário

```
curl -X DELETE -H "Content-Type: application/json" \
-H "Authorization: Bearer token123234" \
 -d '{"name":"VISUALIZAR"}' \
 http://localhost:3333/users/ae2598a1-51c9-44f1-ab1d-f764ebf3c16c/permissions
```

## Frameworks e bibliotecas utilizadas

**Framework para manipulação de requests**

- Express

**Padronização e Automação de Commit**

- Commitzen
- Commitlint

**Testes**

- Jest
- Supertest

**Banco de Dados**

- Knex
- UUID
- TypeORM
- Postgres (PG)
- Bcrypt

**Middleware**

- JWT (Json web token)
- Express-Validator
- CORS
- Helmet

O projeto todo foi construído sob o framework mais conhecido pela comunidade NodeJS, o [Express](http://expressjs.com/pt-br/), por ser simples, rápido e robusto, muito adquiridos pelos desenvolvedores, outro framework que também foi implementado para testes, foi o [Jest](https://jestjs.io/docs/en/getting-started), que possui uma documentação completa para testar a sua aplicação, encontrar diversos e pequenos bugs onde sua equipe pode dormir em paz ao final do expediente rsrs...

A parte de banco de dados, utilizei o famoso framework [TypeORM](https://typeorm.io/#/), já que o projeto foi desenvolvido utilizando Typescript, logo, ele foi uma chave fundamental para conexão com o Postgres DB, já que o ORM totalmente tipado. Um padrão de projeto (Design Pattern) foi utilizado para conexão de dados, o _Singleton_, onde o objeto seria uma única instância na aplicação. A parte de criptografação dos dados mais sensíveis, foi utilizado Bcrypt, e a indexação de dados (ID) com o UUID por questões de segurança.

E por fim, em questões de segurança da aplicação, foi implementado nos middlewares os pacotes mais conhecido e utilizado pela comunidade como: CORS, Helmet, validação de request com o [Express-Validator](https://express-validator.github.io/docs/), e a autenticação com [JWT](https://github.com/auth0/node-jsonwebtoken#readme)
