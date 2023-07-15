const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

router.get("/categories", adminController.getProductCategories);
router.get("/productModels", adminController.getAllProductModels);
router.get("/productModels/:id", adminController.getOneProductModel);

router.post("/images", adminController.uploadMultipleImages);
router.post("/productModels", adminController.createProductModel);

router.patch("/productModels/:id", adminController.editProductModel);


// Delete
router.delete(
  "/productModels/productItem/:id",
  adminController.deleteProductItem
);
router.delete("/productModels/:id", adminController.deleteProductModel);

// router.get("/productModels/productItems/:id", adminController.createProductModel);
router.post(
  "/productModels/productItems/:id",
  adminController.createProductItem
);
// router.patch("/productModels/productItems/:id", adminController.createProductModel);
// router.delete("/productModels/productItems/:id", adminController.createProductModel);

module.exports = router;
