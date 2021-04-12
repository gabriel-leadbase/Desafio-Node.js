const Router = require('koa-trie-router')

const router = new Router()

router.get(async (ctx) => {
    ctx.body = 'home'
})

module.exports = () => {
    return router.middleware()
}