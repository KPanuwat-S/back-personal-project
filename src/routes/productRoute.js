const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/", productController.getAllProducts);
router.get("/productItem", productController.getProductItem);
router.get("/gender/:genderId", productController.getMaleProduct);
router.get("/:productModelId", productController.getProductDetail);

// router.get("/:productModelId", productController.getProductCategory);
router.post("/cart");

router.get("/woman");
router.get("/bestPrice");
router.get("/newIn");

module.exports = router;
