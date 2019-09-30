const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
autoIncrement.initialize(mongoose);

const ApkSchema = new Schema({
  Title: String,
  Publish: String,
  Category: String,
  Version: String,
  Size: String,
  Mod: String,
  Platfrom: String,
  Content: String,
  Link: String,
  Image: String
});
ApkSchema.plugin(autoIncrement.plugin, { model: "Apk", field: "id" });
module.exports = mongoose.model("Apk", ApkSchema, "Apk");
