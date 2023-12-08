const router = require("express").Router();
const ladder=require("../controllers/ladder");
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", uploads.single("picture"), ladder.store);
router.post("/update", uploads.single("picture"), ladder.update);
router.get("/delete/:id", ladder.delete);
router.get("/show/:id", ladder.show);
router.get("/list", ladder.list);


router.post("/search", ladder.searchData);
router.get("/download-report", ladder.downloadExcel);


module.exports=router;