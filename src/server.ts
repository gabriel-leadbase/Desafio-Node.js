import { app } from './app'

app.listen({
	port: 3000
}).then(() => {
	console.log('Aplicação rodando')
}).catch(e => {
	console.error('Erro em rodar o servidor', e)
})