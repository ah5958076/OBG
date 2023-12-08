const router = require("express").Router();
const tournamentResult=require("../controllers/tournamentResult");
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", uploads.single('video'), tournamentResult.store);
router.post("/update", uploads.single('video'), tournamentResult.update);
router.get("/delete/:id", tournamentResult.delete);
router.get("/show/:id", tournamentResult.show);
router.get("/list", tournamentResult.list);


router.post("/search", tournamentResult.searchData);
router.get("/download-report", tournamentResult.downloadExcel);


module.exports=router;