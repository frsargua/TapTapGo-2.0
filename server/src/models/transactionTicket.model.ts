import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class TransactionTicket extends Model<
  InferAttributes<TransactionTicket>,
  InferCreationAttributes<TransactionTicket>
> {}

TransactionTicket.init(
  {
    quantity: DataTypes.INTEGER,
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "transactionTicket",
  }
);

module.exports = TransactionTicket;
