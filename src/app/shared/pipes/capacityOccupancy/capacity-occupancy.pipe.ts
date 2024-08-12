import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'capacityOccupancy',
})
export class CapacityOccupancyPipe implements PipeTransform {
  transform(capacity: number, occupancy: number): string {
    if (capacity === 0) {
      return '0% - 0/0';
    }
    const percentage = Math.round((occupancy / capacity) * 100);
    return `${percentage}% - ${occupancy}/${capacity}`;
  }
}
