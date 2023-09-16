const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserUpload = new Schema({
  userId: String,
  uploads: [String],
});

const UserFiles = mongoose.model("UserFiles", UserUpload);

module.exports = UserFiles;
