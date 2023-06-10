const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
// const authentiCateMiddleware = require("../middlewares/")
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticatedMiddleware, authController.getMe);
module.exports = router;
