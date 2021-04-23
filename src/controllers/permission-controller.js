const mongoose = require('mongoose');
const repository = require('../repositories/permission-repository');
const authService = require('../services/auth-service');
const Permission = mongoose.model('Permission');


exports.post = async (req, res, next) => {

    try {
        const token = req.body.token || req.query.token|| req.headers['x-acess-token'];
        const data = await authService.decodeToken(token);
        await repository.create({
            name: req.body.name
        });
        res.status(201).send({
            message: 'Permissão cadastrada com sucesso!'
        });

    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao cadastrar a Permissão' + e.messages, 
            
        });

    }
}

exports.delete = async (req, res, next) => {

    try {
        const token = req.body.token || req.query.token|| req.headers['x-acess-token'];
        const data = await authService.decodeToken(token);
        let permission = await Permission.findOneAndRemove({name: req.body.name});
        if (!permission)
            return res.status(404).send();
            res.status(201).json({
              message: 'Permissão deletada',
              result: { permission }
            });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            message: 'Falha ao deletar  Permissão ',
            
        });

    }
}