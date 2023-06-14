module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define(
    "Gender",
    {
      gender: {
        type: DataTypes.ENUM("F", "M", "U"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true, timestamps: false }
  );
  Gender.assocaite = (models) => {
    Gender.hasMany(models.ProductModel, {
      foreignKey: {
        name: "genderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Gender.hasMany(models.Category, {
      foreignKey: {
        name: "genderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Gender;
};
