module.exports = (sequelize, DataTypes) => {
  const ProductModel = sequelize.define(
    "ProductModel",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      discount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  ProductModel.associate = (models) => {
    ProductModel.hasMany(models.ProductSize, {
      foreignKey: {
        name: "productModelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductModel.belongsTo(models.Gender, {
      foreignKey: {
        name: "genderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductModel.belongsTo(models.Category, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductModel.hasMany(models.ProductItem, {
      foreignKey: {
        name: "productModelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    ProductModel.hasMany(models.ProductColor, {
      foreignKey: {
        name: "productModelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return ProductModel;
};
