module.exports = (sequelize, DataTypes) => {
  const ProductItem = sequelize.define(
    "ProductItem",
    {
      stockQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  ProductItem.associate = (models) => {
    ProductItem.hasMany(models.CartItem, {
      foreignKey: {
        name: "productItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductItem.hasMany(models.Favorite, {
      foreignKey: {
        name: "productItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductItem.belongsTo(models.ProductModel, {
      foreignKey: {
        name: "productModelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductItem.belongsTo(models.ProductColor, {
      foreignKey: {
        name: "productColorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductItem.belongsTo(models.ProductSize, {
      foreignKey: {
        name: "productSizeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductItem.hasMany(models.OrderItem, {
      foreignKey: {
        name: "productItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return ProductItem;
};
