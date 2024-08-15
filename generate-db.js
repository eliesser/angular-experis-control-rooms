const fs = require('fs');
const { faker } = require('@faker-js/faker');

const NUM_ROMS = 100;
const MAX_FLOOR = 5;

const generateRoom = () => {
  const room = [];
  for (let id = 0; id < NUM_ROMS; id++) {
    const capacity = faker.number.int({ min: 2, max: 30 })
    const occupancy = faker.number.int({ min: 0, max: capacity })
    room.push({
      id: faker.string.uuid(),
      name: `Room ${faker.word.words(1)}`,
      image: faker.image.urlPlaceholder({ width: 240, height: 180, text: '' }),
      capacity,
      occupancy,
      floor: faker.number.int({ min: 1, max: MAX_FLOOR }),
    });
  }
  return room;
};

const generateDb = () => {
  const data = {
    room: generateRoom()
  };

  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

generateDb();