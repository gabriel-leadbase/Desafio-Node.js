import setupApp from './app'
const port = 3030
const app = setupApp

app.listen(port, () => 
  console.log(`app rodando na porta ${port}`)
)