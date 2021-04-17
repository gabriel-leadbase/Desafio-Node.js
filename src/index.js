require("dotenv/config");
require("./database/connect");

const server = require("./server");
const userRoutes = require("./routes/users.route");
const authRoutes = require("./routes/auth.route");

server(1939, [userRoutes, authRoutes]);
