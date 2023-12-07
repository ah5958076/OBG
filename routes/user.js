const router = require("express").Router();
const userController = require("../controllers/user");
const constantMsgs = require("../constants/constants");
const multer = require("multer");
const { uploadImageConfigs } = require("../services/general");


let uploads = uploadImageConfigs();

router.post("/store", userController.store);
router.post("/update", userController.update);
router.get("/delete/:id", userController.delete);
router.get("/show/:id", userController.show);
router.get("/list", userController.list);


router.post("/search", userController.searchData);
router.get("/download-report", userController.downloadExcel);


router.post("/change-password", userController.changePassword);
router.post("/upload-profile-photo", uploads.single("profilePicture"), userController.uploadProfilePhoto);
router.post("/upload-cover-photo", uploads.single("coverPicture"), userController.uploadCoverPhoto);



module.exports=router;