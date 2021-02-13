# Gabriel G Piassa


# Instruções para rodar o projeto

```
    Necessário docker instalado
```

# Altere os aqruivos .example para arquivos comuns se desejar alterar as configurações já inseridas

```bash
$ cp docker-compose.yml.example docker-compose.yml
$ cp config.ts.example config.ts

#Os aqruivos originais foram inseridos no PR, para facilitar a análise.

```

# Instalando as dependencias

```bash
$ npm i -g yarn
$ yarn install
```

# Iniciando a aplicação

```bash
$ docker-compose up -d (para iniciar os containers em modo silencioso)
#fica seu critério qual comando, mas utilizando docker-compose up em modo verboso, será necessário outro terminal para iniciar a aplicação
$ docker-compose up (inicia os containers em modo verboso)

#rodando as migrations do typeorm cli
$ yarn run typeormCli migration:run

#iniciando a aplicação
$ yarn run start:dev

```
                                                
# Documentação está no aqruivo documentation.md 

# Para contato

[![](https://img.shields.io/badge/-@lindaum98-%231DA1F2?style=flat-square&logo=twitter&logoColor=ffffff)](https://twitter.com/lindaum98)
[![](https://img.shields.io/badge/-@piassa157-%23181717?style=flat-square&logo=github)](https://github.com/piassa157)
[![Linkedin Badge](https://img.shields.io/badge/-gabrielpiassa-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-g-piassa/)](https://www.linkedin.com/in/gabriel-g-piassa/)
[![Discord](https://img.shields.io/discord/591914197219016707.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/4NqhuhmQ)

                                                


