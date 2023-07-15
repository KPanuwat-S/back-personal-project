module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define(
    "ProductColor",
    {},
    { underscored: true, timestamps: false }
  );
  ProductColor.associate = (models) => {
    ProductColor.belongsTo(models.ProductModel, {
      foreignKey: {
        name: "productModelId",
        allowNull: false,
      },
      onDelete: "CASCADE",
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
      onDelete: "CASCADE",
    });
    ProductColor.hasMany(models.ProductImg, {
      foreignKey: {
        name: "productColorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };
  return ProductColor;
};
