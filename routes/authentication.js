const router = require('express').Router();
const authentication = require("../controllers/authentication");
const {authenticateUser} = require('../middlewares/auth');


router.get("/verify-token", authenticateUser, authentication.verifyToken)
router.post("/login", authentication.login);
router.post("/signup", authentication.SignupUser);
router.post("/forgot-password", authentication.forgotPassword);
router.post("/verify-code", authentication.verifyCode);
router.post("/change-password", authentication.changePassword);
router.get("/logout", authenticateUser, authentication.logout);


router.get("/admin/dashboard", authenticateUser, authentication.getDashbaordData);

module.exports = router;