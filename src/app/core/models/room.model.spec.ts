// Third Party Libraries imports
import { faker } from '@faker-js/faker';

// Project imports
import { Room } from './room.model';

describe('Room', () => {
  let person: Room;

  beforeEach(() => {
    const MAX_FLOOR = 5;
    const capacity = faker.number.int({ min: 2, max: 30 });
    const occupancy = faker.number.int({ min: 0, max: capacity });
    const room = {
      id: faker.string.uuid(),
      name: `Room ${faker.word.words(1)}`,
      image: faker.image.urlPlaceholder({ width: 240, height: 180, text: '' }),
      capacity,
      occupancy,
      floor: faker.number.int({ min: 1, max: MAX_FLOOR }),
    };

    person = new Room(
      room.id,
      room.name,
      room.image,
      room.capacity,
      room.occupancy,
      room.floor
    );
  });

  it('should create an instance', () => {
    expect(person).toBeTruthy();
  });
});
