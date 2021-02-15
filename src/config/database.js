const mongoose = require("mongoose");
// const { PASSWORD, DATABASE } = process.env;
const PASSWORD = "xi95gfg8";
const DATABASE = "desafio-node";
const uri = `mongodb+srv://administrador:${PASSWORD}@cluster0.en1tn.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

module.exports = () => {
  mongoose.Promise = global.Promise;
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(uri, { useNewUrlParser: true });
  }

  require("../models/users.model");
  return mongoose;
};
