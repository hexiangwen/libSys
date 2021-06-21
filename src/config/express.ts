import express from "express";
import logging from "./logging";
import config from "./config";

export = function () {
  console.log("init express...");
  const app = express();
  app.use(express.static("./vue-libsys/dist"));
  app.use(express.static("./public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  require("../app/routes/news.server.routes")(app);
  app.use(function (req, res, next) {
    res.status(404);
    try {
      return res.json("Not Found");
    } catch (e) {
      console.error("404 set header after sent");
    }
  });
  app.use(function (
    err: { message: any },
    req: any,
    res: { status: (arg0: number) => void; json: (arg0: any) => void },
    next: () => void
  ) {
    if (!err) {
      return next();
    }
    res.status(500);
    try {
      return res.json(err.message || "server error");
    } catch (e) {
      console.error("500 set header after sent");
    }
  });
  return app;
};
