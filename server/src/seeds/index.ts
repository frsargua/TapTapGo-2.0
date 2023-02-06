const seedEvents = require("./event");

const initialise = async () => {
  try {
    console.log("[INFO]: Database connection successful");

    await seedEvents();

    console.log(
      `[INFO]: All data successfully seeded to the ${process.env.MONGODB_NAME} database.`
    );

    process.exit(0);
  } catch (error) {
    console.log(`[ERROR]: Failed to seed all data | ${error.message}`);
  }
};

export = initialise;
