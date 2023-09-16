const { storFile_id, getUserFileData, deleteFromDb } = require("../db/db");

const uploadsRqst = (req, res, next) => {
  const genratedFilename = req.files.file.path.split("uploads\\")[1];

  req.body.userId = req.params.id;
  req.body.uploads = `http://localhost:8000/${genratedFilename}`;

  storFile_id(req.body.userId, req.body)
    .then((result) => {
      res.json({
        status: "Success",
        message: result,
      });
    })
    .catch((err) => {
      res.status(401).json({
        Status: "Failed",
        newErr: err,
      });
    });
};

const getUserFiles = (req, res, next) => {
  const id = req.params.id;
  getUserFileData(id)
    .then((data) => {
      res.json({
        Status: "Success",
        files: data,
      });
    })
    .catch((err) => {
      res.status(401).json({
        Status: "Failed",
        files: err,
      });
    });
};

const deleteController = (req, res, next) => {
  deleteFromDb(req.body)
    .then((data) => {
      res.json({
        Status: "Success",
        files: data,
      });
    })
    .catch((err) => {
      res.status(401).json({
        status: "Failed",
        message: err,
      });
    });
};

module.exports = { uploadsRqst, getUserFiles, deleteController };
