# Desafio para desenvolvedor back-end

Para realizar o desafio usei:
- express
- sequelize
- postgres
- docker

## Como rodar o desafio

Após clonar o repositório será necessário criar um arquivo com o nome ```.env``` e dentro desse arquivo colocar essas informações
```
APP_SECRET="aadf8f9as0s"

APP_URL="localhost:3333"

DB_HOST="localhost"
DB_USER="postgres"
DB_PASS="golfarma"
DB_NAME="golfarma"
```

Em seguida será necessário criar uma database com no postgres, caso queira usar o Docker o comando é 

```
docker run --name golfarma -e POSTGRES_PASSWORD=golfarma -p 5432:5432 -d postgres
```

Assim o container do docker estará criado, porém ainda precisa criar a database, para isso insira o comando 

```
docker exec -it golfarma psql -U postgres --password 
```

Insira a sinha ```golfarma``` e crie a database com o comando ```create database golfarma;```

Assim o seu banco de dados com o docker estará configurado para o projeto, insita ```\q``` para sair

Feito isso será necessário instalar as dependencias do projeto com o comando 

```npm install```

Agora precisamos rodar as migration utilizando o sequelize com o comando
```npx sequelize db:migrate```

Feito tudo isso já podemos rodar o nosso projeto com o comando 
```npm run dev```

Com o servidor rodadon é possícel acessar a documentação no navegador a com a url *http://localhost:3333/api-docs*
