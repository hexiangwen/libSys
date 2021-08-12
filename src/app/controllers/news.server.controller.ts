import mongoose from "mongoose";
const News = mongoose.model("News");
export = {
  create: function (req:any,res:any,next:any) {
    var news = new News(req.body);
    news.save(function (err: any) {
      if (err) return next(err);
      return res.json(news);
    });
  },
  list: function (req:any,res:any,next:any) {
    var pagesize = parseInt(req.query.pagesize, 10) || 10;
    var pagestart = parseInt(req.query.pagestart, 10) || 1;
    News.find()
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec(function (err: any, docs: any) {
        if (err) return next(err);
        return res.json(docs);
      });
  },
  getById: function (req:any,res:any,next:any,id:any) {
    if (!id) return next(new Error("News id not Found"));
    News.findOne({ _id: id }).exec(function (err: any, doc: any) {
      if (err) return next(err);
      if (!doc) return next(new Error("News doc not Found"));
      req.news = doc;
      return next();
    });
  },
  get: function (
    req: { news: any },
    res: { json: (arg0: any) => any },
    next: any
  ) {
    return res.json(req.news);
  },
};
