import { Component, inject } from '@angular/core';
import {
  IParamsFilters,
  IParamsPaginate,
} from '../shared/interfaces/room.interface';
import { Room } from '../shared/models/room';
import { ModalService } from '../shared/services/modal/modal.service';
import { RoomFormComponent } from './components/room-form/room-form.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent {
  filters!: IParamsPaginate;
  visiblePanel: boolean = false;

  private modalService = inject(ModalService);

  setFilters(filters: IParamsFilters) {
    this.visiblePanel = false;
    this.filters = filters as IParamsPaginate;
  }

  openModal(room?: Room) {
    this.modalService.open(RoomFormComponent, {
      title: room ? 'Edit' : 'New',
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      params: { ...room },
      accept: () => {
        this.modalService.newComponent.location.nativeElement
          .querySelector('button')
          .click();
      },
      close: (data) => {
        this.modalService.close();
        if (data) this.filters = { page: 1 } as IParamsPaginate;
      },
    });
  }
}
