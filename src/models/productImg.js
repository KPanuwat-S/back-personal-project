module.exports = (sequelize, DataTypes) => {
  const ProductImg = sequelize.define(
    "ProductImg",
    {},
    { underscored: true, timestamps: false }
  );
  ProductImg.associate = (models) => {
    ProductImg.belongsTo(models.ProductColor, {
      foreignKey: {
        name: "productColorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    ProductImg.belongsTo(models.Img, {
      foreignKey: {
        name: "imgId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };
  return ProductImg;
};
