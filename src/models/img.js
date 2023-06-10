module.exports = (sequelize, DataTypes) => {
  const Img = sequelize.define(
    "Img",
    {
      imagAddress: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Img.associate = (models) =>
    Img.hasMany(models.ProductImg, {
      foreignKey: {
        name: "imgId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  return Img;
};
