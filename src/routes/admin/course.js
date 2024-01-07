var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./public/uploads")) {
            fs.mkdirSync("./public/uploads");
        }
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        const dateNow = Date.now();
        cb(null, `User_Admin_${dateNow}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });
const CourseController = require("../../http/controllers/admin/CourseController");

router.get("/", CourseController.index);

router.get("/add", CourseController.add);
router.post("/add", CourseController.store);

router.get("/edit/:id", CourseController.edit);
router.patch("/edit/:id", CourseController.update);

router.delete("/delete/:id", CourseController.destroy);
router.delete("/deleteAll", CourseController.destroyAll);

router.get("/detail/:id", CourseController.detail);

router.post("/export", CourseController.export);

router.get("/import", CourseController.import);
router.post(
    "/import",
    upload.single("fileCourse"),
    CourseController.handleImport
);

module.exports = router;
