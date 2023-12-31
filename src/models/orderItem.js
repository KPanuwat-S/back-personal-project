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
      sizeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      onDelete: "CASCADE",
    });

    OrderItem.hasMany(models.Order, {
      foreignKey: {
        name: "orderItemId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };
  return OrderItem;
};
