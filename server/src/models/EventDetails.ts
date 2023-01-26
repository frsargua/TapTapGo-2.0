import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

class EventDetails extends Model<
  InferAttributes<EventDetails>,
  InferCreationAttributes<EventDetails>
> {
  declare eventName: string;
  declare description: string;
  declare date: string;
  declare price: number;
  declare ageGroup: string;
  declare attendees: number;
  declare maxAttendees: number;
}

EventDetails.init(
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
    modelName: "event_details",
  }
);

module.exports = EventDetails;