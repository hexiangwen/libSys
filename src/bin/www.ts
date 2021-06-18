import http from "http";
import app from "../app";
import config from "../config/config";
import logging from "../config/logging";
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
  logging.info(
    "express",
    `Server is running ${config.server.hostname}:${config.server.port}`
  )
);
