const router = require("express").Router();
const GPLeague=require("../controllers/GPLeague");
const multer = require("multer");


let multerStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, callback) => {
        let extension = file.originalname.split(".").pop();
        callback(null, Date.now()+"."+extension);
    }
})
let uploads = multer({storage: multerStorage});


router.post("/store", uploads.single("picture"), GPLeague.store);
router.post("/update", uploads.single("picture"), GPLeague.update);
router.post("/delete", GPLeague.delete);
router.post("/show", GPLeague.show);
router.post("/list", GPLeague.list);


router.post("/search", GPLeague.searchData);
router.get("/download-report", GPLeague.downloadExcel);


module.exports=router;