# Instruções


## Builder

 
1. Criar .env a partir do *.env.example* e adicionar dados do banco
2. Em seguida rode os comandos: 

    ```bash
        composer update 
    ```    
    
    ```bash
        php artisan key:generate 
    ```

    ```bash
        php artisan jwt:secret 
    ```

    ```bash
        php artisan migrate
    ```

    ```bash
        php artisan serve 
    ```


## Tecnologias Usadas

- Laravel
- REST
- JWT

Neste repositorio há o codigo que atende aos requisitos solicitados no teste para dev backend da *leabase*:

## Rotas

1. Registrar novos usuarios

    Esta rota registra um novo usuario.
    - Request
        ```bash
        POST http://localhost:8080/api/register 
        ```
    - Body
        ```json
        {
            "cpf": "12345678909",
            "password": "123456",
            "isAdmin": true
        }
        ```
    - Retornos possíveis

        Código | Resposta
        ------------ | -------------
        `200 (OK)` | `` 
        `401 (Requisição inválida)` | `Insira credenciais validas.`

2. Logar Usuarios

    Esta rota faz o login dos usuarios.
    - Request
        ```bash
        POST http://localhost:8080/api/login
        ```
         - Body
        ```json
        {
            "cpf": "12345678909",
            "password": "123456",
        }
        ```
    - Retornos possíveis

        Retorna um objeto com o token, o tipo do token, role e permissões do usuario.

        Código | Resposta
        ------------ | -------------
        `200 (OK)` | [] 
        `400 (Requisição inválida)` | `Insira credenciais validas`

3. Adicionar permissao

    Esta rota adiciona permissões se o usuario for admin;
    - Request 
        ```bash
        POST http://localhost:8080/api/permission
        ```
         - Body
        ```json
        {
            "permission": "Permissao Exemplo",
        }
        ```
    - Retornos possíveis

        Código | Resposta
        ------------ | -------------
        `201 (Created)` | `Permissao Adicionada`
        `400 (Requisição inválida)` | `Ocorreu um erro desconhecido`


4. Remover permissao

    Esta rota remove uma permissao.
    - Request 
        ```bash
        DELETE http://localhost:8080/api/permission
        
        ```
        - Body
        ```json
        {
            "permission": "Permissao Exemplo",
        }
        ```
    - Retornos possíveis

        Código | Resposta
        ------------ | -------------
        `200 (OK) ` | `Permissão Deletada` 
        `400 (Requisição inválida)` | `Insira o nome da permissão`

