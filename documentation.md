# Explicação das tecnologias utilizados

# Docker
```

O docker foi utilizado para não installar o postgres nem o adminer. Sendo assim menos coisas que talvez não utilizaremos em nossa máquina

```

# Postgres

``` 
O Postgres foi escolhido, pela minha afinadade com utilização no dia a dia. E pela facilidade em utilizar orientação a objetos.
```

# Typeorm

```
O TypeOrm é uma das melhores ORMs que já utilizei, com uma documentação simples de entender.
O motivo por ter escolhido ele é pela rapidez e facildiade em gerenciar o banco de dados. Na pasta src/app/models existem entidades as quais podem realizer instancias como repositorios, dessa forma as funções de update, create, delete e etc ... ficam mais faceis de se utilizar.
Para criação de tabelas o typeorm permite que apartir de uma entidade, seja gerado um migration com foreing key e indexes automaticante, utilizando o comando "no caso da aplicação: yarn run typeormCli migration:generate -- -n nomeDesejado"
Dessa maneira um migration contendo as tabelas users e permission será gerado ambas tabelas contendo foreing key a qual instanciei na entidade na pasta models.
O typeorm permite utilizar lógica para gerenciar banco de dados.
```

# Adminer
```
Apenas para gerenciar o bando de dados pelo navegador, sem ser necessário uma IDEA para isso.
```

# Express
```
Apesar de conter algumas falhas de segurança, para pequenos projeto acredito ser uma ótima lib para gerenciar requisições http.
```


# bcrypt, jsonwebtoken e typescript
```
O bcrypt é uma ótima lib para gerar hashs de passwords e outras informações.

O jsonwebtoken é uma lib a qual já utilizei em pequenos projetos.

Typescript foi escolhido também pela minha afinadade em utilizar linguagem tipadas e auxiliar no desenvolvimento mais agíl.
```

