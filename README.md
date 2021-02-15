# Como configurar e rodar

No arquivo `.env.example` na variável `DB_URI` É necessário adicionar uma uri com uma conexão a um banco de dados mongodb.

Na variável `DB_URI` ainda no arquivo `.env.example` será necessário adicionar uma chave de sua preferência para aplicação.

Instalando as dependências

dentro da pasta `cd Desafio-Node.js` execute o comando `Npm install`

depois é só rodar o comando `node app` e a aplicação estará rodando.

Para ter acesso as rotas protegidas é necessário criar um usuário (casa não tenha nenhuma usuário no banco o primeiro a ser criado será administrador).

`/users` | `POST`
exemplo:

{
  "cpf": "00000000",
  "password": "suasenha"
}

Os demais usuário serão cadastrados com o tipo vendedor.

O usuário administrador terá acesso a todas as rotas e poderá alterar as permissões de outros usuários.