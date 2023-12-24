const inventory = require("../controllers/inventory");
const router = require("express").Router();
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", uploads.single("picture"), inventory.store);
router.post("/update", uploads.single("picture"), inventory.update);
router.post("/delete", inventory.delete);
router.get("/show/:id", inventory.show);
router.get("/list", inventory.list);


router.post("/search", inventory.searchData);


module.exports=router;