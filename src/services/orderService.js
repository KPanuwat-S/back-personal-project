const { CartItem, Order, OrderItem } = require("../models");

exports.getCartItemForOrder = async (userId) =>
  await CartItem.findAll({
    where: { userId },
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
    raw: true,
  });

exports.createBulkOrderItem = async (items, t) =>
  await OrderItem.bulkCreate(items, { trasaction: t });

exports.deleteItemsFromCart = async (userId, t) =>
  await CartItem.destroy({ where: { userId } }, { trasaction: t });
