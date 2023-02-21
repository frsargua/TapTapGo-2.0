const User = require("./user.model");
const Address = require("./address.model");
const Review = require("./review.model");
const Events = require("./events.model");
const Category = require("./category.model");
const ImageUrl = require("./image.model");
const Transaction = require("./transaction.model");
const TransactionTicket = require("./transactionTicket.model");
const Ticket = require("./ticket.model");
const Frequency = require("./frequency.mode");

// Events can have multiple address, as they can be changed
// An address can be used by multiple eveEventTicketnts.
Events.belongsToMany(Address, {
  through: "event_address",
  as: "addresses",
  foreignKey: "event_id",
});
Address.belongsToMany(Events, {
  through: "event_address",
  as: "events",
  foreignKey: "address_id",
});

// User can create many events
// Events belong to a single user
User.hasMany(Events, { as: "parties", foreignKey: "host_id" });
Events.belongsTo(User, { as: "host", foreignKey: "host_id" });

// User can create many reviews
// A review belongs to a single user
User.hasMany(Review, { as: "reviews", foreignKey: "creator_id" });
Review.belongsTo(User, { as: "creator", foreignKey: "creator_id" });

//
//
//
//
//
//

// User can have many payments
// A transaction belongs to a single User
User.hasMany(Transaction, { as: "transaction", foreignKey: "user_id" });
Transaction.belongsTo(User, { as: "payer", foreignKey: "user_id" });

Transaction.belongsTo(User);
Transaction.hasMany(TransactionTicket);
TransactionTicket.belongsTo(Ticket);
TransactionTicket.belongsTo(Transaction);
Ticket.belongsTo(Events);
TransactionTicket.belongsTo(User);

//
//
//
//
//
//

// Events can have many reviews
// Reviews belong to a single event
Events.hasMany(Review, { as: "review", foreignKey: "post_id" });
Review.belongsTo(Events, { as: "event", foreignKey: "post_id" });

// Events can have many images
// Images belong to an single event
Events.hasMany(ImageUrl, { foreignKey: "event_id" });
ImageUrl.belongsTo(Events, { foreignKey: "event_id" });

// Events can have many images
// Images belong to an single event
Frequency.hasMany(Events, { foreignKey: "frequency_id" });
Events.belongsTo(Frequency, { foreignKey: "frequency_id" });

// Users can have multiple address, as they can be changed
// An address can be used by multiple users.
User.belongsToMany(Address, {
  through: "user_address",
  as: "address",
  foreignKey: "event_id",
});
Address.belongsToMany(User, {
  through: "user_address",
  as: "user",
  foreignKey: "address_id",
});

// Events can have multiple categories
// Each category can have multiple events
Events.belongsToMany(Category, {
  through: "event_category",
  as: "categories",
  foreignKey: "event_id",
});
Category.belongsToMany(Events, {
  through: "event_category",
  as: "eventsPerCategory",
  foreignKey: "category_id",
});

// User can bookmark many events, but only once each.
// One event can be bookmarked by several users.
User.belongsToMany(Events, {
  through: "bookmark",
  as: "bookmarked",
  foreignKey: "user_id",
});

Events.belongsToMany(User, {
  through: "bookmark",
  as: "bookmarker",
  foreignKey: "event_id",
});

module.exports = {
  User,
  Address,
  Review,
  Events,
  Category,
  ImageUrl,
  Transaction,
  TransactionTicket,
  Frequency,
  Ticket,
};
