// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Project imports
import { RoomPanelFilterComponent } from './room-panel-filter.component';
import { IParamsFilters } from '../../../shared/interfaces';
import { clickElement } from '../../../../testing';

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

    spyOn(component.findRoomsEmit, 'emit');

    component.form.patchValue(mockForm);
    fixture.detectChanges();

    component.onSubmit();

    expect(component.findRoomsEmit.emit).toHaveBeenCalledWith(mockFilters);
  });

  it('should call onReset() when do click button', () => {
    spyOn(component.findRoomsEmit, 'emit');

    clickElement(fixture, 'btn-reset', true);

    fixture.detectChanges();

    expect(component.findRoomsEmit.emit).toHaveBeenCalledWith({ name: '' });
  });

  it('should call onClose() when do click button', () => {
    spyOn(component, 'onClose');

    clickElement(fixture, 'btn-close', true);

    fixture.detectChanges();

    expect(component.onClose).toHaveBeenCalled();
  });
});
