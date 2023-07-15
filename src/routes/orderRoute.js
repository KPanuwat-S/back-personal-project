const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { or } = require("sequelize");


router.post("/", orderController.addItemsInCartToOrder);
router.get("/", orderController.getOrderItems)
module.exports = router;
