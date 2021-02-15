const router = require('express').Router();
const passport = require('passport');
const acl = require('express-acl');
const vendedorController = require('../controllers/vendedor.controller');

router.use(passport.authenticate('jwt', { session: false }));
router.use(acl.authorize);

router.get('/', vendedorController.vendedorPerfil);

module.exports = router;