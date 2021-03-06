const router = require("express").Router();
const authController = require("../controllers/auth");

router.get("/oauth/success", authController.oauthSuccess);
router.get("/login/failed", authController.loginFailed);
router.get("/google", authController.google);
router.post("/logout", authController.logout);

module.exports = router;
