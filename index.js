const Koa = require('koa')
const mount = require('koa-mount')

const app = new Koa()

app.use(mount(require('./api/v1')()))

app.listen(3000, () => {
    console.log("App is Running on http://localhost:3000");
})