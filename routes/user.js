const router = require("express").Router();
const userController = require("../controllers/user");
const constantMsgs = require("../constants/constants");
const multer = require("multer");


let multerStorage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, callback) => {
        let extension = file.originalname.split(".").pop();
        callback(null, Date.now()+"."+extension);
    }
})
let uploads = multer({storage: multerStorage});


router.post("/store", userController.store);
router.post("/update", userController.update);
router.post("/delete", userController.delete);
router.post("/show", userController.show);
router.get("/list", userController.list);

router.get("/download-report", userController.downloadExcel);


router.post("/search", userController.searchData);
router.post("/change-password", userController.changePassword);
router.post("/upload-profile-photo", uploads.single("profilePicture"), userController.uploadProfilePhoto);
router.post("/upload-cover-photo", uploads.single("coverPicture"), userController.uploadCoverPhoto);



module.exports=router;