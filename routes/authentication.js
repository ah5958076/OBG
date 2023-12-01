const router = require('express').Router();
const authentication = require("../controllers/authentication");
const userController = require("../controllers/user");
const {authenticateUser} = require('../middlewares/auth');


router.get("/verify-token", authenticateUser, authentication.verifyToken)
router.post("/login", authentication.login);
router.post("/signup", userController.store);
router.post("/forgot-password", authentication.forgotPassword);
router.post("/verify-code", authentication.verifyCode);
router.post("/change-password", authentication.changePassword);
router.get("/logout/:email", authentication.logout);


module.exports = router;