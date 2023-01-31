const User = require("./user.model");
const Address = require("./address.model");
const Review = require("./review.model");
const Events = require("./events.model");
const Category = require("./category.model");
const ImageUrl = require("./image.model");
const Purchase = require("./purchase.model");
const Payment = require("./payment.model");
const Receipt = require("./receipt.model");
const EventTicket = require("./eventTicket.model");

// Events can have multiple address, as they can be changed
// An address can be used by multiple events.
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
User.hasMany(Review, { as: "review", foreignKey: "creator_id" });
Review.belongsTo(User, { as: "creator", foreignKey: "creator_id" });

// User can have many payments
// A payment belongs to a single User
User.hasMany(Payment, { as: "payment", foreignKey: "user_id" });
Payment.belongsTo(User, { as: "payer", foreignKey: "user_id" });

// A payment has only one receipt
// A receipt belongs to a single payment
Payment.hasOne(Receipt, { as: "receipt", foreignKey: "payment_id" });
Receipt.belongsTo(Payment, { as: "payment", foreignKey: "payment_id" });

// A receipt can have many eventTickets
// A payment belongs to a single User
Receipt.hasMany(EventTicket, { as: "receipt", foreignKey: "receipt_id" });
EventTicket.belongsTo(Receipt, { as: "eventTicket", foreignKey: "receipt_id" });

// Events can have many reviews
// Reviews belong to a single event
Events.hasMany(Review, { as: "review", foreignKey: "post_id" });
Review.belongsTo(Events, { as: "event", foreignKey: "post_id" });

// Events can have many images
// Images belong to an single event
Events.hasMany(ImageUrl, { foreignKey: "event_id" });
ImageUrl.belongsTo(Events, { foreignKey: "event_id" });

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

// Users can buy multiple tickets
//
User.belongsToMany(Events, {
  through: "purchase",
  as: "events",
  foreignKey: "user_id",
});

Events.belongsToMany(User, {
  through: "purchase",
  as: "user",
  foreignKey: "event_id",
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
  Purchase,
};
