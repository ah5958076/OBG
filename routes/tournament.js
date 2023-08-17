const router = require("express").Router();
const tournament=require("../controllers/tournament");
const multer = require("multer");


let multerStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, callback) => {
        let extension = file.originalname.split(".").pop();
        callback(null, Date.now()+"."+extension);
    }
})
let uploads = multer({storage: multerStorage});


router.post("/store", uploads.single("picture"), tournament.store);
router.post("/update", uploads.single("picture"), tournament.update);
router.post("/delete", tournament.delete);
router.post("/show", tournament.show);
router.post("/list", tournament.list);

router.get("/download-report", tournament.downloadExcel);

router.post("/search", tournament.searchData);


module.exports=router;