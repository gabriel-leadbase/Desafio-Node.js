const Router = require('koa-trie-router')

const router = new Router()

router.get("/register", async (ctx) => {
    ctx.body = "register"
})

router.get("/login", async (ctx) => {
    ctx.body = "login"
})

module.exports = () => {
    return router.middleware()
}