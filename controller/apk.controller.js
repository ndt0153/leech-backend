const Apk = require("../model/apk.model");

exports.create = (req, res) => {
  const apk = new Apk({
    Title: req.body.Title,
    Publish: req.body.Publish,
    Category: req.body.Category,
    Version: req.body.Version,
    Size: req.body.Size,
    Mod: req.body.Mod,
    Platfrom: req.body.Platfrom,
    Content: req.body.Content,
    Link: req.body.Link,
    Image: req.body.Image
  });
  apk
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Có lỗi trong quá trình lưu vào database"
      });
    });
};
exports.findAll = (req, res) => {
  Apk.find()
    .then(Apk => {
      res.send(Apk);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Có lỗi trong quá trình tìm dữ liệu"
      });
    });
};
exports.findOne = (req, res) => {
  Apk.findOne({ id: req.params.id })
    .then(Apk => {
      if (!Apk) {
        return res.status(404).send({
          message: "404 not found"
        });
      }
      res.send(Apk);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Khong tìm thấy dữ liệu"
        });
      }
      return res.status(500).send({
        message: "Có lỗi trong quá trình tìm dữ liệu"
      });
    });
};
