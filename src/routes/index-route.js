const express = require('express');
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Desafio Node.js",
    });
});

module.exports = router;