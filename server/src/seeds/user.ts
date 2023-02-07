const { User } = require("../models/index");
const { faker } = require("@faker-js/faker/locale/en_GB");

const generateUsers = async () => {
  const usersArr = [];

  for (let i = 0; i < 5; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const number = faker.phone.number("###########");
    const password = "fabian";
    const username = faker.internet.userName(firstName, lastName);
    const createdAt = faker.date.past(5);
    const profileAvatar = faker.image.avatar();
    const websiteUrl = faker.internet.domainName();
    usersArr.push({
      firstName,
      lastName,
      username,
      number,
      email,
      createdAt,
      profileAvatar,
      websiteUrl,
      password,
    });
  }

  return usersArr;
};

const seedUsers = async () => {
  try {
    const users = await generateUsers();
    const userPromises = users.map((user) => User.create(user));
    await Promise.all(userPromises);
    console.log("Successfully seeded users data.");
  } catch (err: any) {
    console.log(`Failed to seed events data || ${err.message}`);
  }
};

export = seedUsers;
