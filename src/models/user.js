const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cpf: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        required: true,
        enum: ['vendedor', 'administrador'],
        default: 'vendedor'
    }]
});

module.exports = mongoose.model('User', schema);