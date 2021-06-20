import NewsController from "../controllers/news.server.controller";

export = (express: any) => {
  express.route("/news").get(NewsController.list).post(NewsController.create);

  express.route("/news/:nid").get(NewsController.get);

  express.param("nid", NewsController.getById);
};
