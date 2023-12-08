const router = require("express").Router();
const ladderResult=require("../controllers/ladderResult");
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs()

router.post("/store", uploads.single("video"), ladderResult.store);
router.post("/update", uploads.single("video"), ladderResult.update);
router.get("/delete/:id", ladderResult.delete);
router.get("/show/:id", ladderResult.show);
router.get("/list", ladderResult.list);


router.post("/search", ladderResult.searchData);
router.get("/download-report", ladderResult.downloadExcel);


module.exports=router;