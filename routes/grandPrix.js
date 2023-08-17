const router = require("express").Router();
const grandPrix=require("../controllers/grandPrix");



router.post("/store", grandPrix.store);
router.post("/update", grandPrix.update);
router.post("/delete", grandPrix.delete);
router.post("/show", grandPrix.show);
router.get("/list", grandPrix.list);
router.get("/download-report", grandPrix.downloadExcel);

router.post("/search", grandPrix.searchData);


module.exports=router;