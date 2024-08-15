// Third Party Libraries imports
import { faker } from '@faker-js/faker';

// Project imports
import { Room } from './room.model';

const NUM_ROMS = 100;
const MAX_FLOOR = 5;

export const generateOneRoom = (): Room => {
  const capacity = faker.number.int({ min: 2, max: 30 });
  const occupancy = faker.number.int({ min: 0, max: capacity });
  return {
    id: faker.string.uuid(),
    name: `Room ${faker.word.words(1)}`,
    image: faker.image.urlPlaceholder({ width: 240, height: 180, text: '' }),
    capacity,
    occupancy,
    floor: faker.number.int({ min: 1, max: MAX_FLOOR }),
  };
};

export const generateManyRooms = (size = NUM_ROMS): Room[] => {
  const rooms: Room[] = [];

  for (let index = 0; index < size; index++) {
    rooms.push(generateOneRoom());
  }

  return [...rooms];
};
