const userService = require('../services/user.service');

exports.showUsers = async (req, res) => {
    const user = await userService.findAll();

    res.json(user);
}

exports.updateOne = async (req, res) => {
    const data = req.body;
    const updatedUser = await userService.updateOne(data);

    res.status(201).json({ updatedUser }
    );
}