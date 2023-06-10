

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {}, { underscored: true });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.belongsTo(models.OrderItem, {
      foreignKey: {
        name: "orderItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Order.hasOne(models.Payment, {
      foreignKey: {
        name: "paymentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Order;
};
