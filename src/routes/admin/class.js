var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./public/uploads/file")) {
            fs.mkdirSync("./public/uploads/file");
        }
        cb(null, "./public/uploads/file/");
    },
    filename: function (req, file, cb) {
        const dateNow = Date.now();
        cb(null, `Class_${dateNow}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });
const ClassController = require("../../http/controllers/admin/ClassController");

router.get("/", ClassController.index);
router.get("/add", ClassController.add);
router.post("/add", ClassController.store);

router.get("/edit/:id", ClassController.edit);
router.patch("/edit/:id", ClassController.update);

router.delete("/delete/:id", ClassController.destroy);

router.delete("/deleteAll", ClassController.destroyAll);

router.post("/export", ClassController.export);

router.get("/import", ClassController.import);
router.post(
    "/import",
    upload.single("fileClass"),
    ClassController.handleImport
);

router.get("/detail/:id", ClassController.detail);

router.get("/calendar/:id", ClassController.calendar);

module.exports = router;
