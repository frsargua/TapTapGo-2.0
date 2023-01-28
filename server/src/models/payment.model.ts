import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    status: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      defaultValue: "pending",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: "stripe",
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "payment",
  }
);

module.exports = Payment;
