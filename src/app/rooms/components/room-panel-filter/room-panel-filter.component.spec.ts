// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Project imports
import { RoomPanelFilterComponent } from './room-panel-filter.component';

describe('RoomPanelFilterComponent', () => {
  let component: RoomPanelFilterComponent;
  let fixture: ComponentFixture<RoomPanelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomPanelFilterComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomPanelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
