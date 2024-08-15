// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Project imports
import { RoomPanelFilterComponent } from './room-panel-filter.component';
import { clickElement } from '../../../../testing';
import { IParamsFilters } from '../../../core/models';

describe('RoomPanelFilterComponent', () => {
  let component: RoomPanelFilterComponent;
  let fixture: ComponentFixture<RoomPanelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomPanelFilterComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomPanelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send the form successfully onSubmit', () => {
    const mockForm = {
      name: 'Test',
      capacity: 16,
      occupancy: 7,
      floor1: true,
    };

    const mockFilters: IParamsFilters = {
      name: 'Test',
      capacity: 16,
      occupancy: 7,
      floor: [1],
    };

    spyOn(component.findRoomEmit, 'emit');

    component.form.patchValue(mockForm);
    fixture.detectChanges();

    component.onSubmit();

    expect(component.findRoomEmit.emit).toHaveBeenCalledWith(mockFilters);
  });

  it('should call onReset() when do click button', () => {
    spyOn(component.findRoomEmit, 'emit');

    clickElement(fixture, 'btn-reset', true);

    fixture.detectChanges();

    expect(component.findRoomEmit.emit).toHaveBeenCalledWith({ name: '' });
  });

  it('should call onClose() when do click button', () => {
    spyOn(component, 'onClose');

    clickElement(fixture, 'btn-close', true);

    fixture.detectChanges();

    expect(component.onClose).toHaveBeenCalled();
  });
});
