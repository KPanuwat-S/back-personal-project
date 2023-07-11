const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

router.get("/productModels", adminController.getAllProductModels);
router.post("/productModels", adminController.createProductModel);
router.patch("/productModels/:id", adminController.editProductModel);
router.delete("/productModels/:id", adminController.deleteProductModel);

// router.get("/productModels/productItems/:id", adminController.createProductModel);
router.post(
  "/productModels/productItems/:id",
  adminController.createProductItem
);
// router.patch("/productModels/productItems/:id", adminController.createProductModel);
// router.delete("/productModels/productItems/:id", adminController.createProductModel);

module.exports = router;
