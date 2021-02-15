const port = process.env.PORT || 3001;

require("./src/config/database")();
const app = require("./src/config/http")();

app.listen(port);
