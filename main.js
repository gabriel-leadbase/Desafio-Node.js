const server = require('express')();
require('dotenv').config();

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
})

module.exports = server;