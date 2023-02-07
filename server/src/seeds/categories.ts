const { Category } = require("../models/index");

const seedCategories = async () => {
  try {
    let categories = [
      { category: "salsa" },
      { category: "bachata" },
      { category: "kizomba" },
    ];
    const categoriesPromises = categories.map((cat) => Category.create(cat));
    await Promise.all(categoriesPromises);

    console.log("Successfully seeded categories data.");
  } catch (err) {
    console.log(`Failed to seed events data || ${err.message}`);
  }
};

export = seedCategories;
