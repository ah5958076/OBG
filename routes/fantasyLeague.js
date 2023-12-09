const router = require("express").Router();
const fantasyLeague=require("../controllers/fantasyLeague");



router.post("/store", fantasyLeague.store);
router.post("/update", fantasyLeague.update);
router.get("/delete/:id", fantasyLeague.delete);
router.get("/show/:id", fantasyLeague.show);
router.get("/list", fantasyLeague.list);
router.get("/download-report", fantasyLeague.downloadExcel);


router.post("/search", fantasyLeague.searchData);
router.get("/download-report", fantasyLeague.downloadExcel);


module.exports=router;