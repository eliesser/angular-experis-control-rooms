import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { RoomsService } from '../../../shared/services/rooms/rooms.service';
import { Room } from '../../../shared/models/room';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent {
  form!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private modalService = inject(ModalService);
  private roomsService = inject(RoomsService);

  ngOnInit() {
    this.initForm();
  }

  onSave() {
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

  private initForm() {
    const {
      name = '',
      floor = 1,
      capacity = 2,
      occupancy = 0,
    } = this.modalService.modalOptions?.params;

    this.form = this.formBuilder.group({
      name: [name, [Validators.required]],
      floor: [floor, [Validators.required]],
      capacity: [capacity],
      occupancy: [occupancy],
    });
  }
}
