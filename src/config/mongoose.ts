import mongoose from "mongoose";
import config from "./config";
export = () => {
  const db = mongoose.connect(config.mongo.url, config.mongo.options);
  require("../app/models/news.server.model");
  return db;
};
