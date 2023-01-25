const User = require("./User");
const Address = require("./Address");
const UserAddress = require("./UserAddress");
const Review = require("./Review");

User.hasMany(Review);
Review.belongsTo(User);

User.belongsToMany(Address, { through: UserAddress, unique: false });
Address.belongsToMany(User, { through: UserAddress, unique: false });

module.exports = {
  User,
  Address,
};
