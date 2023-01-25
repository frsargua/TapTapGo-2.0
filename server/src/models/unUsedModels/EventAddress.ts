// import sequelize from "./server/src/config/db";
// import {
//   DataTypes,
//   InferAttributes,
//   InferCreationAttributes,
//   Model,
//   ForeignKey,
//   CreationOptional,
// } from "sequelize";

// class EventAddress extends Model<
//   InferAttributes<EventAddress>,
//   InferCreationAttributes<EventAddress>
// > {
//   declare id: CreationOptional<number>;
//   declare event_detail_id: ForeignKey<typeof EventDetails["id"]>;
//   declare address_id: ForeignKey<typeof Address["id"]>;
// }

// EventAddress.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },

//     event_detail_id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       unique: "uniquePair",
//       references: {
//         model: "event_details",
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
//     modelName: "event_address",
//   }
// );

// module.exports = EventAddress;
