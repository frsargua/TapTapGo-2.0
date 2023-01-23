import sequelize from "../config/db";
import { DataTypes } from "sequelize";

export const User = sequelize.define("person", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});
