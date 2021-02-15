const db = require('../config/database/dbConnection');

const userModel = new db.model('testes', {
    cpf: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'vendedor',
        required: true,
    },
});

module.exports = userModel;