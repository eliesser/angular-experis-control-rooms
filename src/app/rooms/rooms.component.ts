// Angular imports
import { Component, inject } from '@angular/core';

// Project imports
import { IParamsFilters, IParamsPaginate } from '../shared/interfaces';
import { Room } from '../shared/models/room';
import { ModalService } from '../shared/services';
import { RoomFormComponent } from './components';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent {
  filters!: IParamsPaginate;
  visiblePanel: boolean = false;

  private modalService: ModalService = inject(ModalService);

  setFilters(filters: IParamsFilters): void {
    this.visiblePanel = false;
    this.filters = filters as IParamsPaginate;
  }

  openModal(room?: Room): void {
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
