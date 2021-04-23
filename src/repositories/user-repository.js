const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = async (data) => {
    const res = await User.findOne({
        cpf: data.cpf,
        password: data.password
    });
    return res;
}

exports.create = async (data) => {
    var user = new User(data);
    await user.save();
}

