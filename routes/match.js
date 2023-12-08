const router = require("express").Router();
const match=require("../controllers/match");
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", uploads.single("video"), match.store);
router.post("/update", uploads.single("video"), match.update);
router.get("/delete/:id", match.delete);
router.get("/show/:id", match.show);
router.get("/list", match.list);


router.post("/search", match.searchData);
router.get("/download-report", match.downloadExcel);


module.exports=router;