const express = require("express");
const router = express.Router();
const { checkAuthorization } = require("../middleware/middlewares");
const { dataRqst } = require("../controller/authContrllr");
const {
  uploadsRqst,
  getUserFiles,
  deleteController,
} = require("../controller/uploadsContller");
const multipart = require("connect-multiparty");
const path = require("path");

const uploadsPath = path.join(__dirname, "../uploads");
const multipatyMiddleware = multipart({ uploadDir: uploadsPath });

router.use(checkAuthorization);
router.get("/getData/:id", dataRqst);
router.post("/upload/:id", multipatyMiddleware, uploadsRqst);
router.get("/userUploads/:id", getUserFiles);
router.delete("/delete", deleteController);

module.exports = router;
