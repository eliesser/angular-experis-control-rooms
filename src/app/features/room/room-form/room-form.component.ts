// Angular imports
import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';

// Project imports
import { ModalService, RoomService } from '../../../core/services';
import { Room } from '../../../core/models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent {
  form!: FormGroup;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private modalService: ModalService = inject(ModalService);
  private roomService: RoomService = inject(RoomService);

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

    const params = this.modalService.modalOptions?.params;

    let id = '';
    if (params?.id) id = params.id;

    if (id.length)
      this.roomService
        .update(id, { ...this.form.value })
        .subscribe((room: Room) => {
          this.modalService?.modalOptions?.close(room);
        });
    else
      this.roomService
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
