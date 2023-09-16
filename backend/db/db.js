const User = require("./schemas/User");
const UserFiles = require("./schemas/UserUploads");

const createUser = (userData) => {
  return new Promise((res, rej) => {
    User.findOne({ username: userData.username })
      .then((data) => {
        if (data) {
          rej("UserName Already Exist");
        } else {
          const user = new User(userData);
          res(user.save());
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};

const getUserById = (id) => {
  return User.find({ _id: id });
};

const userValidation = (userData) => {
  return User.findOne({ username: userData.username });
};

const storFile_id = (id, userData) => {
  return new Promise((res, rej) => {
    UserFiles.findOne({ userId: id })
      .then((data) => {
        if (data) {
          res(
            UserFiles.updateOne(
              { userId: id },
              { $push: { uploads: userData.uploads } }
            )
          );
        } else {
          const newUserFile = new UserFiles(userData);
          res(newUserFile.save());
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};

const getUserFileData = (id) => {
  return new Promise((res, rej) => {
    UserFiles.findOne({ userId: id })
      .then((data) => {
        if (data) {
          res(data);
        } else {
          rej("No Data Found");
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};

const deleteFromDb = (userData) => {
  return new Promise((res, rej) => {
    UserFiles.findOne({ userId: userData.id })
      .then((data) => {
        if (data) {
          res(
            UserFiles.updateOne(
              { userId: userData.id },
              { $pull: { uploads: { $in: [userData.delData] } } }
            )
          );
        } else {
          rej("No match");
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};

module.exports = {
  createUser,
  userValidation,
  getUserById,
  storFile_id,
  getUserFileData,
  deleteFromDb,
};
