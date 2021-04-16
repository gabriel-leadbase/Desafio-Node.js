require("dotenv/config");
require("./database/connect");

const server = require("./server");

server(1939);
