// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Project imports
import { RoomCardComponent } from './room-card.component';
import { CapacityOccupancyPipe } from '../../../shared/pipes';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let fixture: ComponentFixture<RoomCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomCardComponent],
      imports: [CapacityOccupancyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;
    component.room = {
      id: '',
      name: '',
      image: '',
      capacity: 2,
      occupancy: 0,
      floor: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
