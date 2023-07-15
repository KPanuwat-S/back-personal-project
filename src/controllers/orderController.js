const { sequelize } = require("../models");
const orderService = require("../services/orderService");

exports.addItemsInCartToOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const itemInCart = await orderService.getCartItemForOrder(user.id);
    await itemInCart.forEach(async (el) => {
      console.log(
        "--------------------------------------------------------",
        el
      );
      await orderService.deleteStockQuantity(el, t);
    });
    const data = await orderService.createBulkOrderItem(itemInCart, t);
    await orderService.deleteItemsFromCart(user.id, t);
    await t.commit();
    res.status(200).json(data);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.getOrderItems = async (req, res, next) => {
  try {
    const user = req.user;
    const data = await orderService.getOrderItems(user.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
