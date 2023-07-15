module.exports = (sequelize, DataTypes) => {
  const Img = sequelize.define(
    "Img",
    {
      imgAddress: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true, timestamps: false }
  );
  Img.associate = (models) =>
    Img.hasMany(models.ProductImg, {
      foreignKey: {
        name: "imgId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  return Img;
};
