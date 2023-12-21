const controller = require("../controllers/game");
const router = require("express").Router();
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", uploads.single("picture"), controller.store);
router.post("/update", uploads.single("picture"), controller.update);
router.post("/delete", controller.delete);
router.get("/show/:id", controller.show);
router.get("/list", controller.list);


router.post("/search", controller.searchData);
router.get("/download-report", controller.downloadExcel);


module.exports=router;