const User = require("./User");
const Address = require("./Address");
const Review = require("./Review");
const EventDetails = require("./EventDetails");
const Category = require("./Category");
const ImageUrl = require("./Image");
const Purchase = require("./Purchase");
const Payment = require("./Payment");
const Receipt = require("./Receipt");
const EventTicket = require("./EventTicket");

// User can create many events
// Events belong to a single user
User.hasMany(EventDetails, { as: "event", foreignKey: "hostId" });
EventDetails.belongsTo(User, { as: "user", foreignKey: "hostId" });

// User can create many reviews
// A review belongs to a single user
User.hasMany(Review, { as: "review", foreignKey: "createdById" });
Review.belongsTo(User, { as: "user", foreignKey: "createdById" });

// User can have many payments
// A payment belongs to a single User
User.hasMany(Payment, { as: "payment", foreignKey: "userId" });
Payment.belongsTo(User, { as: "user", foreignKey: "userId" });

// A payment has only one receipt
// A receipt belongs to a single payment
Payment.hasOne(Receipt, { as: "receipt", foreignKey: "paymentId" });
Receipt.belongsTo(Payment, { as: "payment", foreignKey: "paymentId" });

// A receipt can have many eventTickets
// A payment belongs to a single User
Receipt.hasMany(EventTicket, { as: "receipt", foreignKey: "receiptId" });
EventTicket.belongsTo(Receipt, { as: "eventTicket", foreignKey: "receiptId" });

// Events can have many reviews
// Reviews belong to a single event
EventDetails.hasMany(Review, { as: "review", foreignKey: "postId" });
Review.belongsTo(EventDetails, { as: "event", foreignKey: "postId" });

// Events can have many images
// Images belong to an single event
EventDetails.hasMany(ImageUrl, { foreignKey: "eventId" });
ImageUrl.belongsTo(EventDetails, { foreignKey: "eventId" });

// Events can have multiple address, as they can be changed
// An address can be used by multiple events.
EventDetails.belongsToMany(Address, {
  through: "eventAddress",
  constraints: true,
});
Address.belongsToMany(EventDetails, {
  through: "EventAddress",
  constraints: true,
});

// Users can have multiple address, as they can be changed
// An address can be used by multiple users.
User.belongsToMany(Address, {
  through: "UserAddress",
  as: "address",
  unique: false,
  constraints: true,
});
Address.belongsToMany(User, {
  through: "UserAddress",
  as: "userAddress",
  unique: false,
  constraints: true,
});

// Events can have multiple categories
// Each category can have multiple events
EventDetails.belongsToMany(Category, {
  through: "EventCategory",
  as: "categories",
});
Category.belongsToMany(EventDetails, {
  through: "EventCategory",
  as: "eventDetails",
});

// Users can buy multiple tickets
//
User.belongsToMany(EventDetails, {
  through: Purchase,
  as: "purchasedEvents",
  constraints: true,
});

EventDetails.belongsToMany(User, {
  through: Purchase,
  as: "purchasedByUsers",
  constraints: true,
});

// User can bookmark many events, but only once each.
// One event can be bookmarked by several users.
User.belongsToMany(EventDetails, {
  through: "Bookmark",
  as: "bookmarkedEvents",
  unique: true,
  constraints: true,
});

EventDetails.belongsToMany(User, {
  through: "Bookmark",
  as: "bookmarkedByUsers",
  unique: true,
  constraints: true,
});

module.exports = {
  User,
  Address,
  Review,
  EventDetails,
  Category,
  ImageUrl,
  Purchase,
};
