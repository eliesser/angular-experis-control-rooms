// Angular imports
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

// Project imports
import { ModalService, RoomsService } from '../../../shared/services';
import { Room } from '../../../shared/models/room';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent {
  form!: FormGroup;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private modalService: ModalService = inject(ModalService);
  private roomsService: RoomsService = inject(RoomsService);

  ngOnInit(): void {
    this.initForm();
  }

  get nameField(): AbstractControl<any, any> | null {
    return this.form.get('name');
  }

  get floorField(): AbstractControl<any, any> | null {
    return this.form.get('floor');
  }

  get capacityField(): AbstractControl<any, any> | null {
    return this.form.get('capacity');
  }

  get occupancyField(): AbstractControl<any, any> | null {
    return this.form.get('occupancy');
  }

  onSave(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (!this.form.valid) return;

    const { id = '' } = this.modalService.modalOptions?.params;

    if (id.length)
      this.roomsService
        .update(id, { ...this.form.value })
        .subscribe((room: Room) => {
          this.modalService?.modalOptions?.close(room);
        });
    else
      this.roomsService
        .create({ ...this.form.value })
        .subscribe((room: Room) => {
          this.modalService?.modalOptions?.close(room);
        });
  }

  private initForm(): void {
    const params = this.modalService.modalOptions?.params;

    let name = '';
    if (params?.name) name = params.name;

    let floor = 1;
    if (params?.floor) floor = params.floor;

    let capacity = 2;
    if (params?.capacity) capacity = params.capacity;

    let occupancy = 0;
    if (params?.occupancy) name = params.occupancy;

    this.form = this.formBuilder.group({
      name: [name, [Validators.required]],
      floor: [floor, [Validators.required]],
      capacity: [capacity, [Validators.required]],
      occupancy: [occupancy, [Validators.required]],
    });
  }
}
