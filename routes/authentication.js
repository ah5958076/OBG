const router = require('express').Router();
const authentication = require("../controllers/authentication");
const userController = require("../controllers/user");


router.post("/login", authentication.login);
router.post("/signup", userController.store);
router.post("/forgotpassword", authentication.forgotPassword);
router.post("/verifycode", authentication.verifyCode);
router.get("/logout/:email", authentication.logout);


module.exports = router;