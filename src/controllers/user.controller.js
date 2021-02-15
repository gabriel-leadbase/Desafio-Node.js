const userService = require('../services/user.service');

exports.createUser = async (req, res) => {
    const user = req.body;
    const newUser = await userService.createUser(user);

    res.status(201).json({ newUser }
    );
}