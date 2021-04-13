## Tecnologias:
* NodeJs
* Koa

## Instruções:
* Clonar o projeto
* Fazer checkout no branch `lucas-fratel-santana`
* Rodar um `npm i` para instalar as dependências
* Rodar `npm run start` para inicializar a API

## Sobre
Uma API que permite o cadastro de usuários com funções, para limitar o acesso a algumas rotas.
O banco de dados é um mockup de um banco de dados NoSQL.
As sessões fica armazenada na memória.

O usuário ao logar usuando o CPF e a Senha recebe uma session id que é usada para acessar as rotas bloqueadas `/admin`, mas só terá acesso se o usuário tiver função de `admin`.
