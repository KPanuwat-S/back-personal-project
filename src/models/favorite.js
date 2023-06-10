module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Favorite.belongsTo(models.ProductItem, {
      foreignKey: {
        name: "productItemId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Favorite;
};
