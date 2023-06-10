module.exports = (sequelize, DataTypes) => {
  const ProductImg = sequelize.define("ProductImg", {}, { underscored: true });
  ProductImg.associate = (models) => {
    ProductImg.belongsTo(models.ProductColor, {
      foreignKey: {
        name: "productColorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductImg.belongsTo(models.Img, {
      foreignKey: {
        name: "imgId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return ProductImg;
};
