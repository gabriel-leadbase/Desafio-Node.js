# ✅ Desafio para desenvolvedor back-end
<hr>
Essa é a minha solução do desafio para desenvolvedor back-end.

## ✨ Tecnologias utilizadas

- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Express](https://expressjs.com/pt-br/)
- [JSON Web Tokens](https://jwt.io/)
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [cpf cnpj validator](https://www.npmjs.com/package/cpf-cnpj-validator)

## 🔧 Instalação
<hr>

```bash
  // Clonar repositório
  $ git clone https://github.com/gabrielsilvares/Desafio-Node.js.git

  // Acessar diretório
  $ cd Desafio-Node.js

  // Instalar dependências
  $ yarn
```

<hr>
#### Configuração do docker

```bash
  //Inciar container
  $ docker-compose up -d
```
Após iniciar ir no arquivo **docker-compose.yml** e colocar o usuário e a senha que preferir. (é necessário que seja igual ao arquivo **ormconfig.json**)

<hr>
#### Rodando as migrations

No arquivo **ormconfig.json** defina o nome do banco de dados e crie um banco com o mesmo nome.

```bash
  $ yarn typeorm migration:run
```
Se houver algum erro com uuid, rode a seguinte comando SQL.

```bash
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
por fim execute o comando

```bash
  $ yarn dev
```

<hr>
### 🗂️ Funcionalidades

- [x] Cadastro de usuário
- [x] Cadastro de permissiões
- [x] Deletar de permissiões
- [x] Cadastro de roles
- [x] Autênticação com token
- [x] Autorização com nivel de acesso, através do token
