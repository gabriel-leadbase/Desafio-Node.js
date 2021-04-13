const Koa = require('koa')
const mount = require('koa-mount')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())

app.use(mount('/api/v1/users', require('./api/v1/users')()))
app.use(mount('/api/v1/admin', require('./api/v1/admin')()))

app.listen(3000, () => {
    console.log("App is running on http://localhost:3000")
})