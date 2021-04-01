# Intruções

## Passos para rodar:
- clone o projeto
- acesse a branch Joao-Cirqueira
- crie o banco de dados mysql com nome desafio
- a configuração do banco de dados esta em: src/config/database.js
- rode o comando yarn para instalar as dependencias
- rode o comando yarn start para iniciar o servidor
- o servidor estara rodando em: localhost:3333/
- a documentacao da api esta disponivel em: localhost:3333/api-docs/
- o arquivo para teste no postman esta na raiz do projeto: Desafio-Node.postman_collection.json

## Arquitetura do Projeto:
- config: resonsavel pelos arquivos com estruturas de configuração
- database: responsavel pela conecção com o banco de dados e com as migrations
- documentation: responsavel pela documentacao swagger do projeto
- errors: resonsavel pela estrutura de erros
- middlewares: responsavel pelos middlewares do projeto, como a autenticação
- models: responsavel pelas models, estrutura dos dados do banco
- routes: responsavel pelas rotas do servidor
- services: reponsavel pelas regras de negocio da aplicação
- validators: responsavel pelas validações de corpos de requisições

## Principais Tecnologias Usadas:
- node com express
- bcryptjs
- jsonwebtoken
- mysql2
- sequelize
- swagger-ui-express
- yup
- eslint
- prettier
- sucrase
- nodemon
