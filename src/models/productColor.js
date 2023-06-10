module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define(
    "ProductColor",
    {},
    { underscored: true }
  );
  ProductColor.associate = (models) => {
    ProductColor.belongsTo(models.ProductModel, {
      foreignKey: {
        name: "productModelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductColor.belongsTo(models.Color, {
      foreignKey: {
        name: "colorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductColor.hasMany(models.ProductItem, {
      foreignKey: {
        name: "productColorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductColor.hasMany(models.ProductImg, {
      foreignKey: {
        name: "productColorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return ProductColor;
};
