import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

class Frequency extends Model<
  InferAttributes<Frequency>,
  InferCreationAttributes<Frequency>
> {
  declare id: CreationOptional<number>;
  declare frequency: string;
}

Frequency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "frequency",
  }
);

module.exports = Frequency;
