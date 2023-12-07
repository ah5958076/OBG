const router = require("express").Router();
const team = require("../controllers/team");


router.post("/store", team.store);
router.post("/update", team.update);
router.get("/delete/:id", team.delete);
router.get("/show/:id", team.show);
router.get("/list", team.list);


router.post("/search", team.search);
router.get("/download-report", team.downloadExcel);


module.exports=router;