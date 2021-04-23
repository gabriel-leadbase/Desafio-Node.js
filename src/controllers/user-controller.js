const repository = require('../repositories/user-repository');
const authService = require('../services/auth-service');

exports.post = async (req, res, next) => {

    try {
        await repository.create({
            cpf: req.body.cpf,
            password: req.body.password,
            roles: [req.body.roles]
        });
        res.status(201).send({
            message: 'Usuário cadastrado com sucesso!'
        });

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição' 
        });
    }
};

exports.authenticate = async (req, res, next) => {

    try {
        const user = await repository.authenticate(({
            cpf: req.body.cpf,
            password: req.body.password
        }))
        if (!user) {
            res.status(404).send({
                message: "Usuário ou senha inválidos"
            });
            return;
        }
        const token = await authService.generateToken({
            cpf: user.cpf,
            roles: user.roles
        });

        res.status(201).send({
            token: token,
            data: {
                cpf: user.cpf,
                password: user.password,
                roles: user.roles
            }
        });

    } catch (e) {
        res.status(400).send({
            message: 'Falha ao autenticar usuário ' ,
            data: e
        });

    }
};