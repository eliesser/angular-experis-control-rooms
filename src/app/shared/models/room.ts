export class Room {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public capacity: number,
    public occupancy: number,
    public floor: number
  ) {}
}
