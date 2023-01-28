import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

class Address extends Model<
  InferAttributes<Address>,
  InferCreationAttributes<Address>
> {}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    firstLine: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    secondLine: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    postcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "address",
  }
);

module.exports = Address;
