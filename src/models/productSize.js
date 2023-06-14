module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define(
    "ProductSize",
    {},
    { underscored: true, timestamps: false }
  );
  ProductSize.associate = (models) => {
    ProductSize.belongsTo(models.Size, {
      foreignKey: {
        name: "sizeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductSize.belongsTo(models.ProductModel, {
      foreignKey: {
        name: "productModelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductSize.hasMany(models.ProductItem, {
      foreignKey: {
        name: "productSizeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return ProductSize;
};
