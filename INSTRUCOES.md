### Como rodar a aplicação
* Clone este repositório:
    ``` sh
    git clone https://github.com/KalebeLopes/Desafio-Node.js.git
    ```
* Na raiz do projeto:
  ``` sh
  npm install
  ```
* Executar em modo de desenvolvimento:
  ``` sh
  npm run start:dev
  ```
* Executar os testes unitários:
  ``` sh
  npm run test:unit
  ```
### Funcionalidades
  * CRUD de usuário
  * Criptografia da senha no banco
  * Autenticação de um usuário
  * Geração do token de acesso após a autenticação
  * Liberação das rotas para "admin"
  * Bloqueio das rotas para "vendedor" (menos a rota de autenticação)
  * Implementação de testes de unidade para a segurança da aplicação

### Documentação da API
* https://documenter.getpostman.com/view/15119271/TzCMdoMw

### Ferramentas utilizadas
* bcrypt
* body-parser
* config
* express
* express-acl
* jsonwebtoken
* mongoose
* babel
* chai
* eslint
* mocha
* prettier
* sinon
* supertest

### Usuário admin
  cpf: "123456"
  password: "123"