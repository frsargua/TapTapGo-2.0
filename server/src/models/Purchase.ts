import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypeAbstract,
} from "sequelize";

class Purchase extends Model<
  InferAttributes<Purchase>,
  InferCreationAttributes<Purchase>
> {}

Purchase.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "purchase",
  }
);

module.exports = Purchase;
