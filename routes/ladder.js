const router = require("express").Router();
const ladder=require("../controllers/ladder");
const multer = require("multer");


let multerStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, callback) => {
        let extension = file.originalname.split(".").pop();
        callback(null, Date.now()+"."+extension);
    }
})
let uploads = multer({storage: multerStorage});


router.post("/store", uploads.single("picture"), ladder.store);
router.post("/update", uploads.single("picture"), ladder.update);
router.post("/delete", ladder.delete);
router.post("/show", ladder.show);
router.post("/list", ladder.list);


router.post("/search", ladder.searchData);
router.get("/download-report", ladder.downloadExcel);


module.exports=router;