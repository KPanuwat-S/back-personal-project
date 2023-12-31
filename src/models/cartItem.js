module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      quantity: {
        type: DataTypes.INTEGER,
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
  CartItem.associate = (models) => {
    CartItem.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    CartItem.belongsTo(models.ProductItem, {
      foreignKey: {
        name: "productItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return CartItem;
};
