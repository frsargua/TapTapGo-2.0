const User = require("./User");
const Address = require("./Address");
const Review = require("./Review");
const EventDetails = require("./EventDetails");
const Category = require("./Category");
const ImageUrl = require("./Image");
const Purchase = require("./Purchase");

// User can create many events
// Events belong to a single user
User.hasMany(EventDetails, { as: "event", foreignKey: "hostId" });
EventDetails.belongsTo(User, { as: "user", foreignKey: "hostId" });

// User can create many reviews
// A review belongs to a single user
User.hasMany(Review, { as: "review", foreignKey: "createdById" });
Review.belongsTo(User, { as: "user", foreignKey: "createdById" });

// Events can have many reviews
// Reviews belong to a single event
EventDetails.hasMany(Review, { as: "review", foreignKey: "postId" });
Review.belongsTo(EventDetails, { as: "event", foreignKey: "postId" });

// Events can have many images
// Images belong to an single event
EventDetails.hasMany(ImageUrl, { as: "images", foreignKey: "eventId" });
ImageUrl.belongsTo(EventDetails, { as: "event", foreignKey: "eventId" });

// Events can have multiple address, as they can be changed
// An address can be used by multiple events.
EventDetails.belongsToMany(Address, {
  through: "EventAddress",
  as: "address",
  unique: false,
  constraints: true,
});
Address.belongsToMany(EventDetails, {
  through: "EventAddress",
  as: "event",
  unique: false,
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
