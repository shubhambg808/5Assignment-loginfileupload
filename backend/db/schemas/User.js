const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  username: {
    unique: true,
    type: String,
  },
  securepin: Number,
  password: String,
});
const User = mongoose.model("User", userSchema);

module.exports = User;
