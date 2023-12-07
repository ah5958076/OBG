const router = require("express").Router();
const grandPrix=require("../controllers/grandPrix");



router.post("/store", grandPrix.store);
router.post("/update", grandPrix.update);
router.post("/delete", grandPrix.delete);
router.post("/show", grandPrix.show);
router.get("/list", grandPrix.list);


router.post("/search", grandPrix.searchData);
router.get("/download-report", grandPrix.downloadExcel);


router.post("/update/status", grandPrix.updateStatus);


module.exports=router;