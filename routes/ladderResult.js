const router = require("express").Router();
const ladderResult=require("../controllers/ladderResult");
const multer = require("multer");


let multerStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, callback) => {
        let extension = file.originalname.split(".").pop();
        callback(null, Date.now()+"."+extension);
    }
})
let uploads = multer({storage: multerStorage});


router.post("/store", uploads.single("video"), ladderResult.store);
router.post("/update", uploads.single("video"), ladderResult.update);
router.get("/delete/:id", ladderResult.delete);
router.get("/show/:id", ladderResult.show);
router.get("/list", ladderResult.list);


router.post("/search", ladderResult.searchData);
router.get("/download-report", ladderResult.downloadExcel);


module.exports=router;