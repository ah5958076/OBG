const router = require("express").Router();
const matchResult=require("../controllers/matchResult");


router.post("/store", matchResult.store);
router.post("/update", matchResult.update);
router.get("/delete/:id", matchResult.delete);
router.get("/show/:id", matchResult.show);
router.get("/list", matchResult.list);

router.post("/search", matchResult.searchData);


module.exports=router;