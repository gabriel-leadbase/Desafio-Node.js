const authService = require('../services/auth.service');

exports.generateToken = async (req, res) => {
    const data = req.body;
    const response = await authService.generateToken(data);
    res.status(200).json({ response });
}
