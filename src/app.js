const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const app = express();
const router = express.Router();

moongose.connect('mongodb://localhost:27017/desafio', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const user = require('./models/user');
const Permission = require('./models/permission');

const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');
const permissionRoute = require('./routes/permission-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/user', userRoute);
app.use('/permission', permissionRoute);

module.exports = app;