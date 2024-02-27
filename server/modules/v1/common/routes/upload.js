const router = require("express").Router(),
  multer = require("multer"),
  path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where you want to store the uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

/* | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ AUTH ~ ~ ~ ~ ~ ~ ~ ~ ~ ~| */
const { requireAuth } = require("../../../../auth/authentication");

/* | ~ ~ ~ ~ ~ ~ CONTROLLER FUNCTIONS ~ ~ ~ ~ ~ | */
const { uploadFile } = require("../controller/upload");

/* | ~ ~ ~ ~ ~ ~ VALIDATION FUNCTIONS ~ ~ ~ ~ ~ | */
const { validateUpload } = require("../validation/upload");

/* --------------------------------------------------
 |                                                  |
 | ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ROUTES ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ |
 |                                                  |
 --------------------------------------------------- */

router.post(
  "/upload",
  // requireAuth(),
  upload.single("file"),
  validateUpload,
  uploadFile
);

module.exports = router;
