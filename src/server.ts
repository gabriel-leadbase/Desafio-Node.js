import { app } from './app'
import { env } from './env/env'

app.listen({
	port: env.PORT
}).then(() => {
	console.log('Aplicação rodando')
}).catch(e => {
	console.error('Erro em rodar o servidor', e)
})