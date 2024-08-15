// Angular imports
import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';

// Project imports
import { IParamsPaginate, IParamsFilters, Room } from '../../../core/models';
import { ModalService } from '../../../core/services';
import { RoomFormComponent } from '../room-form/room-form.component';
import { RoomPanelFilterComponent } from '../room-panel-filter/room-panel-filter.component';
import { RoomListComponent } from '../room-list/room-list.component';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [NgClass, RoomPanelFilterComponent, RoomListComponent],
  templateUrl: './shell-layout.component.html',
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
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
