import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

class Events extends Model<
  InferAttributes<Events>,
  InferCreationAttributes<Events>
> {}

Events.init(
  {
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    ageGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attendees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    maxAttendees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "events",
  }
);

module.exports = Events;
