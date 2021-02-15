const jwt = require('jsonwebtoken');
const userService = require('./user.service');
// const User = require('../models/user.model');

exports.generateToken = async (data) => {
    const user = await userService.findOne({ cpf: data.cpf });

    if (!user) {
        return 'User doesn\'t exists';
    }

    if (data.cpf !== user.cpf || data.password !== user.password) {
        return 'Incorrect cpf or password';
    }

    try {
        const userToJson = JSON.parse(JSON.stringify(user));
        const { password, ...nData } = userToJson;

        const token = jwt.sign({ user: nData }, process.env.SECRET, {
            subject: user._id.toString()
        });

        return { token };

    } catch (err) {
        console.log(err);
    }
}