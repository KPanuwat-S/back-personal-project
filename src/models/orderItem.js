module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    OrderItem.belongsTo(models.ProductItem, {
      foreignKey: {
        name: "productItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    OrderItem.hasMany(models.Order, {
      foreignKey: {
        name: "orderItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return OrderItem;
};
