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
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        const dateNow = Date.now();
        cb(null, `User_Admin_${dateNow}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });
const UserController = require("../../http/controllers/admin/UserController");
const UserValidate = require("../../http/middlewares/UserValidate");

router.get("/", UserController.index);
router.post("/", UserController.index);
router.get("/add", UserController.add);
router.post("/add", UserValidate(), UserController.store);

router.get("/edit/:id", UserController.edit);
router.patch("/edit/:id", UserController.update);

router.delete("/delete/:id", UserController.destroy);

router.delete("/deleteAll", UserController.destroyAll);

router.post("/export", UserController.export);

router.get("/import", UserController.import);
router.post("/import", upload.single("fileUser"), UserController.handleImport);

module.exports = router;
