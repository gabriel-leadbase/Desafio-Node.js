# Iniciando o projeto 
```bash
$ npm install 
$ npm run dev 
$ npm run test 
```
caso o nodemon seja instalado utilize o segunte comando 

```bash
$ npm install nodemon
```

### todos os requisitos do desafio foram atendidos, é possivel criar usuarios com permissao de 'adm' e 'sales' referentes a administrador e vendedor respectivamente

### somente usuarios com permição de adm podem utilizar funções alem do login

### foram criados testes TDD ultilizando jest para as funções do desafio

### as rotas criadas foram sendo elas responsaveis por registrar usuarios, fazer o login e adicionar ou remover uma permissão a um usuario

```curl 
/desafio-node.api/user_register
/desafio-node.api/user_login
/desafio-node.api/modify_permission
```

### a rota 'user_register' recebe cpf, senha, nome e a permissão do usuario a ser criado.
### a rota 'user_register' recebe o cpf e a senha do usuario e retorna o token com os dados do mesmo.
### a rota 'modify_permission' recebe o token de um usuario logado, o cpf do usuario no qual a permissao vai ser mudada e o nome da nova permissão do mesmo. Tambem verifica pelo token se o usuario é um adm, caso afirmativo altera a permissão.