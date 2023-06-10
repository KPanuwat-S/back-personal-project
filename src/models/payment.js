module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Payment.associate = (models) => {
    Payment.hasOne(models.Order, {
      foreignKey: {
        name: "paymentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Payment;
};
