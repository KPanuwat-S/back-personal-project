const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");

router.get("/", productController.getAllProducts);
router.get("/productItem", productController.getProductItem);
router.get("/:productModelId", productController.getProductDetail);

// router.get("/:productModelId", productController.getProductCategory);
router.post("/cart");
router.get("/man");
router.get("/woman");
router.get("/bestPrice");
router.get("/newIn");

module.exports = router;
