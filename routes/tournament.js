const router = require("express").Router();
const tournament=require("../controllers/tournament");
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", uploads.single("picture"), tournament.store);
router.post("/update", uploads.single("picture"), tournament.update);
router.get("/delete/:id", tournament.delete);
router.get("/show/:id", tournament.show);
router.get("/list", tournament.list);


router.post("/search", tournament.searchData);
router.get("/download-report", tournament.downloadExcel);


module.exports=router;