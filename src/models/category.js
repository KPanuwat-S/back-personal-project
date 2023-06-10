module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Category.associate = (models) => {
    Category.belongsTo(models.Gender, {
      foreignKey: {
        name: "genderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Category.hasMany(models.ProductModel, {
      foreignKey: {
        name: "categoryId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Category;
};
