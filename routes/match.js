const router = require("express").Router();
const match=require("../controllers/match");
const multer = require("multer");


let multerStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, callback) => {
        let extension = file.originalname.split(".").pop();
        callback(null, Date.now()+"."+extension);
    }
})
let uploads = multer({storage: multerStorage});


router.post("/store", uploads.single("video"), match.store);
router.post("/update", uploads.single("video"), match.update);
router.get("/delete/:id", match.delete);
router.get("/show/:id", match.show);
router.get("/list", match.list);


router.post("/search", match.searchData);
router.get("/download-report", match.downloadExcel);


module.exports=router;