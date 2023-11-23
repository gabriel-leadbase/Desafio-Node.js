### Requesitos funcionais

[] Deve ser possível cadastrar usuário
[] Deve ser possível autenticar usuário
[] Deve ser possível cadastrar permissão
[] Deve ser possível  atualizar permissão 
[] Deve ser possível  apagar permissão
[] Deve ser possível dar permissão a um usuário
[] Deve ser possível remover permissão a um usuário
[] Deve ser possível atualizar usuário
[] Deve ser possível cadastrar produto
[] Deve ser possível  atualizar produto
[] Deve ser possível  listar produto
[] Deve ser possível deletar produto

### Requesitos não funcionais

[] encryptar a senha
[] dar um token de acessao para o usuário
[] dar um refresh token para o usuário
[] os dados vão ser persistidos com o banco de dados Postgres

### Regras de negócio

[] apenas um admin ou quem tem permissão pode acessar as rotas
[] o cpf não pode conter caracteres especiais
[] a senha deve conter no mínimo 8 caracteres
[] todos os campos são obrigatórios para criar um usuário
[] não pode cadastrar duas pessoas com o mesmo cpf

### Entidades

[] User
    - Id / único
    - Name / No mínimo 3 caracteres
    - Cpf / Não aceitará caracteres especiais, sendo no formato XXXXXXXXXXX 
    - Role / Enum com Admin ou Vendedor 
    - Permissions / relaçao, um usuário pode ter várias permissões, opcional
    - Password / Mínimo 8 caracteres
    - CreatedAt
[] Product
    - Id / único
    - Name
    - Valor 
    - Description
    - CreatedAt
    - UpdatedAt
[] Permissions - apenas Admins podem ter acesso
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
[] prisma -D
[] @prisma/client

- Linguagem
[] typescript tsx tsup @types/node -D

- Melhoras minhas tipagens
[] zod

- Encryptar senha
[] bcryptjs @types/bcryptjs

- Framework
[] fastify

- Auth
[] @fastify/jwt

- Cookie
[] @fastify/cookie

- Testes
[] vistest vitest-tsconfig-paths -D
[] supertest

### Container Docker

- Bitnami/Postgres

[] docker run --name leadbase -e POSTGRESQL_USERNAME=admin -e POSTGRESQL_PASSWORD=admin -e POSTGRESQL_DATABASE=leadbase -p 5432:5432 bitnami/postgresql
