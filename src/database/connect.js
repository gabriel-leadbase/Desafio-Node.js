const mongoose = require("mongoose");

const mongo = {
  server: process.env.MONGO_SERVER,
  database: process.env.MONGO_DATABASE
};

mongoose.connect(`mongodb://${mongo.server}/${mongo.database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("An error has been ocurred on mongoose:", err);
});

db.once("open", () => console.log("Mongoose connection is running!"));
