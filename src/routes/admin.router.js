const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const passport = require('passport');
const acl = require('express-acl');

router.use(passport.authenticate('jwt', { session: false }));
router.use(acl.authorize);

router.post('/', (req, res) => {
    res.send('Rota de admin')
});

router.put('/users', adminController.updateOne);

router.get('/users', adminController.showUsers);

module.exports = router;