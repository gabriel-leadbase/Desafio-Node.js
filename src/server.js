import setupApp from './app'
import User from "../src/models/user"
const port = 3030;

(async () => {
  try {
    const app = await setupApp()
    const server = app.listen(port, () =>
      console.info(`App rodando na porta ${port}`)
    )

    const admin = new User({
      name: 'kalebe',
      cpf: '123456',
      password: '123',
      role: 'admin'
    })
    console.log(admin)
    admin.save()

    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"]
    exitSignals.map(sig =>
      process.on(sig, () =>
        server.close(err => {
          if (err) {
            console.error(err)
            process.exit(1)
          }
          app.database.connection.close(function() {
            console.info("Database connection closed!")
            process.exit(0)
          });
        })
      )
    );
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})();
