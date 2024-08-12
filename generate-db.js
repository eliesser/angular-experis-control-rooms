const fs = require('fs');
const { faker } = require('@faker-js/faker');

const NUM_ROMS = 100;

const generateRooms = () => {
  const rooms = [];
  for (let id = 0; id < NUM_ROMS; id++) {
    const capacity = faker.number.int({ min: 2, max: 30 })
    rooms.push({
      id: faker.string.uuid(),
      name: `Room ${faker.word.words(1)}`,
      image: faker.image.urlPlaceholder({ width: 240, height: 180, text: '' }),
      capacity: faker.number.int({ min: 2, max: capacity }),
      occupancy: faker.number.int({ min: 0, max: capacity }),
      floor: faker.number.int({ min: 1, max: 5 }),
    });
  }
  return rooms;
};

const generateDb = () => {
  const data = {
    rooms: generateRooms()
  };

  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

generateDb();