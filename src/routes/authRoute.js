const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const authenticatedMiddleware = require("../middlewares/authenticate");
// const authentiCateMiddleware = require("../middlewares/")
router.post("/register", authController.register);
router.post("/createAdress", authController.createUserAddress);
router.post("/login", authController.login);
router.get("/me/address", authenticatedMiddleware, authController.getAddress);
router.get("/me", authenticatedMiddleware, authController.getMe);

module.exports = router;
