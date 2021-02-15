const app = require('./main');
const { json } = require('express');
const acl = require('express-acl');
const { config, response } = require('./src/config/aclConfig');
acl.config(config, response);

app.use(json());

/** Passport stratefy config */
require('./src/middlewares/auth/auth');

/** import routes */
const authRouter = require('./src/routes/auth.router');
const adminRouter = require('./src/routes/admin.router');
const vendedorRouter = require('./src/routes/vendedor.router');
const userRouter = require('./src/routes/user.router');



/** load routes */
app.get('/', (req, res) => {
    res.status(200).json({ ok: 'Qualquer um tem acesso' });
});

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/vendedor', vendedorRouter);
