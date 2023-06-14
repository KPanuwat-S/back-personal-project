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
    { underscored: true, timestamps: false }
  );
  Color.associate = (models) => {
    Color.hasMany(models.ProductColor, {
      foreignKey: {
        name: "colorId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Color;
};
