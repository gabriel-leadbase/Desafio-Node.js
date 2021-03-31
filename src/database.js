import mongoose from "mongoose";
import config from "config";

const mondodbUrl = config.get("database.mongoUrl");

const connect = () =>
  mongoose.connect(mondodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

export default {
  connect,
  connection: mongoose.connection
};
