module.exports = (sequelize, DataTypes) => {
  const CartItem2 = sequelize.define(
    "CartItem2",
    {
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      color: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      SIZE: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },

    { underscored: true }
  );
  CartItem2.associate = (models) => {
    CartItem2.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return CartItem2;
};
