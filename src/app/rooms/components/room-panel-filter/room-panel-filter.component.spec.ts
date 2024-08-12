import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPanelFilterComponent } from './room-panel-filter.component';

describe('RoomPanelFilterComponent', () => {
  let component: RoomPanelFilterComponent;
  let fixture: ComponentFixture<RoomPanelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPanelFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomPanelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
