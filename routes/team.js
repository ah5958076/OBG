const router = require("express").Router();
const team = require("../controllers/team");


router.post("/store", team.store);
router.post("/update", team.update);
router.get("/delete/:id", team.delete);
router.get("/show/:id", team.show);
router.get("/list", team.list);


router.get("/search", team.search);


module.exports=router;