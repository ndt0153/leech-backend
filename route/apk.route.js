module.exports = app => {
  const apk = require("../controller/apk.controller");
  app.post("/apk", apk.create);
  app.get("/apk", apk.findAll);
  app.get("/apk/:id", apk.findOne);
};
