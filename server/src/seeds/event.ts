const {
  Events,
  User,
  ImageUrl,
  Category,
  Address,
} = require("../models/index");
const { faker } = require("@faker-js/faker/locale/en_GB");

const { format } = require("date-fns");

const formatDate = (date) => format(new Date(date), "dd/MM/yyyy");

const generateEvents = async () => {
  const users = await User.findAll();
  const ageGroupArr = ["Children", "Teenagers", "Adults", "Seniors"];
  const citiesGroupArr = [
    "London",
    "Birmingham",
    "Brighton",
    "Surrey",
    "Nottingham",
    "Bristol",
    "Liverpool",
    "Bath",
    "Leicester",
    "Cardiff",
    "Exeter",
    "York",
  ];
  for (let i = 0; i < users.length; i++) {
    const { username } = users[i];
    const { id: userId } = users[i];

    const numberOfEvents = Math.floor(Math.random() * 5);

    for (let j = 0; j < numberOfEvents; j++) {
      const randomAgeGroup =
        ageGroupArr[Math.floor(Math.random() * ageGroupArr.length)];

      const eventName = faker.lorem.words(3);
      const description = faker.lorem.paragraph(1);
      const frequency_id = 1;
      const date = formatDate(faker.date.future());
      const price = faker.commerce.price(0, 100);
      const ageGroup = randomAgeGroup;
      const attendees = faker.datatype.number(100);
      const maxAttendees = faker.datatype.number(100);
      const eventImages = [
        { imageLink: faker.image.city() },
        { imageLink: faker.image.city() },
        { imageLink: faker.image.city() },
        { imageLink: faker.image.city() },
      ];
      const eventAddress = {
        city: citiesGroupArr[Math.floor(Math.random() * citiesGroupArr.length)],
        firstLine: faker.address.street(),
        secondLine: faker.address.street(),
        postcode: faker.address.zipCodeByState(),
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      };

      const eventCategories = [{ id: 1, category: "salsa" }];

      const eventData = {
        frequency_id,
        eventName,
        description,
        date,
        price,
        ageGroup,
        host_id: userId,
        attendees,
        maxAttendees,
      };

      const createdEvent = await Events.create(eventData);

      await Promise.all(
        eventImages.map(async (image) => {
          return await ImageUrl.create({
            imageLink: image.imageLink,
            event_id: createdEvent.id,
          });
        })
      );

      await Promise.all(
        eventCategories.map(async (category) => {
          let categoryFromDB = await Category.findByPk(category.id);
          await createdEvent.addCategory(categoryFromDB);
        })
      );

      const { firstLine, city, postcode } = eventAddress;

      let addressFromDB = await Address.findOne({
        where: { firstLine, city, postcode },
      });

      console.log(addressFromDB);

      if (addressFromDB) {
        await createdEvent.addAddress(addressFromDB);
      } else {
        let address = await Address.create(eventAddress);
        console.log(address);
        await createdEvent.addAddress(address);
      }
    }
  }
};

const seedEvents = async () => {
  try {
    await generateEvents();
    console.log("Successfully seeded events data.");
  } catch (err) {
    console.log(`Failed to seed events data || ${err.message}`);
  }
};

export = seedEvents;
