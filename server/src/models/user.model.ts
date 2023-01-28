import sequelize from "../config/db";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ForeignKey,
  CreationOptional,
} from "sequelize";
import bcrypt from "bcrypt";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare firstName: string;
  declare lastName: string;
  declare username: string;
  declare age: number;
  declare profileAvatar: string;
  declare aboutMe: string;
  declare websiteUrl: string;
  declare number: string;
  declare email: string;
  declare password: string;

  checkPassword(loginPw: string) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 15],
      },
    },
    age: {
      type: DataTypes.INTEGER,
    },
    profileAvatar: {
      type: DataTypes.STRING,
    },
    aboutMe: {
      type: DataTypes.STRING,
    },
    websiteUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        console.log(newUserData.dataValues.password);
        newUserData.password = await bcrypt.hash(
          newUserData.dataValues.password,
          10
        );
        console.log(newUserData.dataValues);

        console.log("hashed");
        // return newUserData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
