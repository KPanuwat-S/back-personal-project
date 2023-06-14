module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
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
  CartItem.associate = (models) => {
    CartItem.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    // CartItem.belongsTo(models.ProductItem, {
    //   foreignKey: {
    //     name: "productItemId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    // });
  };
  return CartItem;
};
