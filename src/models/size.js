module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
    "Size",
    {
      size: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true, timestamps: false }
  );
  Size.associate = (models) => {
    Size.hasMany(models.ProductSize, {
      foreignKey: {
        name: "sizeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Size;
};
