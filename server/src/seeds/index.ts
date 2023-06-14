const seedEvents = require("./event");
const seedUsers = require("./user");
const seedCategories = require("./categories");
const seedFrequency = require("./frequency");

const initialise = async () => {
  try {
    console.log("[INFO]: Database connection successful");

    await seedUsers();
    await seedCategories();
    await seedFrequency();
    // await seedEvents();

    console.log(
      `[INFO]: All data successfully seeded to the ${process.env.MONGODB_NAME} database.`
    );

    process.exit(0);
  } catch (error) {
    console.log(`[ERROR]: Failed to seed all data | ${error.message}`);
  }
};

export = initialise;
