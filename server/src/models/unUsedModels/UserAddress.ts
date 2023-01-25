// import sequelize from "../config/db";
// import {
//   DataTypes,
//   InferAttributes,
//   InferCreationAttributes,
//   Model,
//   ForeignKey,
//   CreationOptional,
// } from "sequelize";

// class UserAddress extends Model<
//   InferAttributes<UserAddress>,
//   InferCreationAttributes<UserAddress>
// > {
//   declare id: CreationOptional<number>;
//   declare user_id: ForeignKey<typeof User["id"]>;
//   declare address_id: ForeignKey<typeof Address["id"]>;
// }

// UserAddress.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },

//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: "uniquePair",
//       references: {
//         model: "user",
//         key: "id",
//       },
//     },

//     address_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: "uniquePair",
//       references: {
//         model: "address",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: "user_address",
//   }
// );

// module.exports = UserAddress;
