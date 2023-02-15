import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from "sequelize";

class ImageUrl extends Model<
  InferAttributes<ImageUrl>,
  InferCreationAttributes<ImageUrl>
> {
  declare id: CreationOptional<number>;
  declare imageLink: string;
}

ImageUrl.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    imageLink: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "image_url",
  }
);

module.exports = ImageUrl;
