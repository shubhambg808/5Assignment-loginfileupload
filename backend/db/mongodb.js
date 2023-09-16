const mongoose = require("mongoose");

const connectUser = (URL) => {
  return mongoose.connect(URL);
};

module.exports = connectUser;
