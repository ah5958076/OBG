const router = require("express").Router();
const GPLeague=require("../controllers/GPLeague");
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", uploads.single("picture"), GPLeague.store);
router.post("/update", uploads.single("picture"), GPLeague.update);
router.post("/delete", GPLeague.delete);
router.get("/show/:id", GPLeague.show);
router.get("/list", GPLeague.list);


router.post("/search", GPLeague.searchData);
router.get("/download-report", GPLeague.downloadExcel);


module.exports=router;