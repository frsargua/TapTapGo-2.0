const { Frequency } = require("../models/index");

const seedFrequency = async () => {
  try {
    let frequencies = [
      { frequency: "monthly" },
      { frequency: "weekly" },
      { frequency: "special" },
    ];
    const frequencyPromises = frequencies.map((freq) => Frequency.create(freq));
    await Promise.all(frequencyPromises);

    console.log("Successfully seeded frequency data.");
  } catch (err) {
    console.log(`Failed to seed frequency data || ${err.message}`);
  }
};

export = seedFrequency;
