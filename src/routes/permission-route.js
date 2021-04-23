const express = require('express');
const router = express.Router();
const controller = require('../controllers/permission-controller');
const authService = require('../services/auth-service');

router.post('/', authService.isAdmin, controller.post);
router.delete('/', authService.isAdmin, controller.delete);


module.exports = router;