const User = require('../models/user.model');

exports.createUser = async (user) => {

    const findUsers = await this.findAll();
    console.log(findUsers.length);

    const validationUser = {
        cpf: user.cpf,
        password: user.password,
        role: 'vendedor'
    };

    if (findUsers.length < 1) {
        validationUser.role = 'admin';
    }


    if (!user.cpf || !user.password) {
        return "All fields are required";
    }

    const findUser = await this.findOne({ cpf: user.cpf });

    if (findUser) {
        return "User already exists";
    }

    try {
        const newUser = new User(validationUser);
        const createdUser = await newUser.save();
        return createdUser;
    } catch (err) {
        console.log(err);
    }
}

exports.findOne = async (data) => {
    try {
        const user = await User.findOne(data).select('+password');
        return user;
    } catch (err) {
        console.log(err);
    }
}

exports.findAll = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        console.log(err);
    }
}

exports.updateOne = async (obj) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(obj._id, { role: obj.role }, { new: true });
        return updatedUser;
    } catch (err) {
        return err;
    }
}