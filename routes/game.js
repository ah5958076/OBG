const controller = require("../controllers/game");
const router = require("express").Router();
const multer = require("multer");

let multerStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, callback) => {
        let extension = file.originalname.split(".").pop();
        callback(null, Date.now()+"."+extension);
    }
})
let uploads = multer({storage: multerStorage});


router.post("/store", uploads.single("picture"), controller.store);
router.post("/update", uploads.single("picture"), controller.update);
router.post("/delete", controller.delete);
router.post("/show", controller.show);
router.post("/list", controller.list);

router.post("/search", controller.searchData);


module.exports=router;