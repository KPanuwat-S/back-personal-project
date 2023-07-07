const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

// Add item to cart
router.post("/", cartController.addItemToCart);

// Read item from cart
router.get("/", cartController.getItemFromCart);

// Update item from cart
router.patch("/:id", cartController.updateItemFromCart);

// Delete item from cart
router.delete("/:id", cartController.deleteItemFromCart);

module.exports = router;
