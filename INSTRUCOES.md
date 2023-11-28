### Requesitos funcionais

[X] Deve ser possível cadastrar usuário
[X] Deve ser possível autenticar usuário
[X] Deve ser possível cadastrar permissão
[] Deve ser possível atualizar permissão 
[] Deve ser possível apagar permissão
[] Deve ser possível dar permissão a um usuário
[] Deve ser possível remover permissão a um usuário
[] Deve ser possível atualizar usuário
[X] Deve ser possível cadastrar produto
[] Deve ser possível atualizar produto
[] Deve ser possível listar produto
[] Deve ser possível deletar produto

### Requesitos não funcionais

[X] encryptar a senha
[x] dar um token de acessao para o usuário
[x] dar um refresh token para o usuário
[X] os dados vão ser persistidos com o banco de dados Postgres

### Regras de negócio

[x] apenas um admin ou quem tem permissão pode acessar as rotas
[] o cpf não pode conter caracteres especiais
[x] a senha deve conter no mínimo 8 caracteres
[x] todos os campos são obrigatórios para criar um usuário
[x] não pode cadastrar duas pessoas com o mesmo cpf

### Entidades

[X] User
    - Id / único
    - Name / No mínimo 3 caracteres
    - Cpf / Não aceitará caracteres especiais, sendo no formato XXXXXXXXXXX 
    - Role / Enum com Admin ou Vendedor 
    - Permissions / relaçao, um usuário pode ter várias permissões, opcional
    - Password / Mínimo 8 caracteres
    - CreatedAt
[X] Product
    - Id / único
    - Name
    - Valor 
    - Description
    - CreatedAt
    - UpdatedAt
[X] Permissions - apenas Admins podem ter acesso
    - Id
    - Name
    - CreatedAt
    - UpdatedAt

### Permissões

- CRUD produto

### Fluxo da aplicação

Usuário se loga como administrador -> ele possui todas as permissões possíveis 
Usuário se loga como vendedor -> ele não possui nenhuma permissão ( o administrador dar permissão para ele ou pode retirar a permissão)

Como que eu dou permissão para um usuário?

1. Na hora da autenticação eu passo a Role no token
2. Se tiver dentro Admin eu deixo ele ter todas as permissões
2. Se tiver dentro 

### Dependências

- Orm
[X] prisma -D
[X] @prisma/client

- Linguagem
[X] typescript tsx tsup -D
[X] @types/node 

- Melhoras minhas tipagens
[X] zod

- Encryptar senha
[X] bcryptjs @types/bcryptjs

- Framework
[X] fastify

- Auth
[X] @fastify/jwt

- Cookie
[X] @fastify/cookie

- Testes
[X] vitest vite-tsconfig-paths -D
[X] supertest

- Lint
[X] eslint -D

- Env
[X] dotenv

### Container Docker

- Bitnami/Postgres

[X] docker run --name leadbase -e POSTGRESQL_USERNAME=admin -e POSTGRESQL_PASSWORD=admin -e POSTGRESQL_DATABASE=leadbase -p 5432:5432 bitnami/postgresql


### Meus desafios

Durante o desenvolvimento do código acabei caindo em um erro que nunca tinha visto, quando foi instalado a versao 4.24 do fastify. Quando eu criava meu `const app = fastify()` ou criava o meu tipo com FastifyInstance, por algum motivo o tipo não era reconhecido e não conseguia usar nenhum método http.