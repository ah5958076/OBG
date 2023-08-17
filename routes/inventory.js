const inventory = require("../controllers/inventory");
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


router.post("/store", uploads.single("picture"), inventory.store);
router.post("/update", uploads.single("picture"), inventory.update);
router.post("/delete", inventory.delete);
router.post("/show", inventory.show);
router.post("/list", inventory.list);

router.post("/search", inventory.searchData);


module.exports=router;