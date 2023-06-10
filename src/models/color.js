module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  )
  Color.associate = (models) => {
    Color.belongsTo(models.ProductColor, {
      foreignKey: {
        name: "productColorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Color;
};
