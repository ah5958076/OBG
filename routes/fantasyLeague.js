const router = require("express").Router();
const fantasyLeague=require("../controllers/fantasyLeague");



router.post("/store", fantasyLeague.store);
router.post("/update", fantasyLeague.update);
router.post("/delete", fantasyLeague.delete);
router.post("/show", fantasyLeague.show);
router.post("/list", fantasyLeague.list);
router.get("/download-report", fantasyLeague.downloadExcel);


router.post("/search", fantasyLeague.searchData);
router.get("/download-report", fantasyLeague.downloadExcel);


module.exports=router;