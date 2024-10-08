// Angular imports
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

// Project imports
import { IParamsFilters } from '../../../core/models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-room-panel-filter',
  templateUrl: './room-panel-filter.component.html',
  styleUrl: './room-panel-filter.component.scss',
})
export class RoomPanelFilterComponent {
  @Output() findRoomEmit = new EventEmitter<IParamsFilters>();

  form!: FormGroup;

  private formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    const filters: IParamsFilters = {} as IParamsFilters;

    const name: string = this.form.get('name')?.value;

    if (name) filters.name = name;

    const capacity = this.form.get('capacity')?.value;

    if (capacity > 2) filters.capacity = capacity;

    const occupancy = this.form.get('occupancy')?.value;

    if (occupancy > 0) filters.occupancy = occupancy;

    const floor: number[] = [];

    [1, 2, 3, 4, 5].forEach((star: number) => {
      if (this.form.get('floor' + star)?.value) floor.push(star);
    });

    if (floor.length) filters.floor = floor;

    this.findRoomEmit.emit(filters);
  }

  onReset(): void {
    this.form.reset();

    this.form.get('capacity')?.setValue(2);
    this.form.get('occupancy')?.setValue(0);

    const filters = { name: '' };

    this.findRoomEmit.emit(filters);
  }

  onClose(): void {}

  private initForm(): void {
    const controls: any = {
      name: [''],
      capacity: [2],
      occupancy: [0],
    };

    [1, 2, 3, 4, 5].forEach((floor: number) => {
      controls['floor' + floor] = [false, []];
    });

    this.form = this.formBuilder.group(controls);
  }
}
