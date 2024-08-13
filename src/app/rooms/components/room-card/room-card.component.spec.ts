// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Project imports
import { RoomCardComponent } from './room-card.component';
import { CapacityOccupancyPipe } from '../../../shared/pipes';
import { Room } from '../../../shared/models/room';
import { clickElement, getText } from '../../../../testing';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let fixture: ComponentFixture<RoomCardComponent>;

  const mockData: Room = {
    id: 'a3bda92f-523d-4d99-9823-63076e1758c5',
    name: 'Room blah',
    image: 'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
    capacity: 16,
    occupancy: 7,
    floor: 4,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomCardComponent],
      imports: [CapacityOccupancyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;

    component.room = mockData;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be {mockData.name}', () => {
    expect(component.room.name).toEqual(mockData.name);
  });

  it('should display a text with {mockData.name}', () => {
    const expectName = 'Room blah';

    expect(getText(fixture, 'name')).toContain(expectName);
  });

  it('should call onEdit() when do click button', () => {
    spyOn(component.openModalEmit, 'emit');

    clickElement(fixture, 'btn-edit', true);

    fixture.detectChanges();

    expect(component.openModalEmit.emit).toHaveBeenCalledWith(mockData);
  });

  it('should call onRemove() when do click button', () => {
    spyOn(component.removeEmit, 'emit');

    clickElement(fixture, 'btn-remove', true);

    fixture.detectChanges();

    expect(component.removeEmit.emit).toHaveBeenCalledWith(mockData.id);
  });
});
