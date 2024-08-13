// Angular imports
import { CapacityOccupancyPipe } from './capacity-occupancy.pipe';

fdescribe('CapacityOccupancyPipe', () => {
  it('create an instance', () => {
    const pipe = new CapacityOccupancyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return `50% - 5/10` capacity=10 y occupancy=5', () => {
    const pipe = new CapacityOccupancyPipe();
    const rta = pipe.transform(10, 5);
    expect(rta).toEqual('50% - 5/10');
  });

  it('should return `0% - 0/0` capacity=10 y occupancy=5', () => {
    const pipe = new CapacityOccupancyPipe();
    const rta = pipe.transform(0, 5);
    expect(rta).toEqual('0% - 0/0');
  });
});
