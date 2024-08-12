import { Component, inject, Input, SimpleChanges } from '@angular/core';

import {
  IParamsPaginate,
  IResponseRooms,
} from '../../../shared/interfaces/room.interface';
import { Room } from '../../../shared/models/room';
import { RoomsService } from '../../../shared/services/rooms/rooms.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  @Input() filters!: IParamsPaginate;

  rooms!: Room[];
  page: number = 1;
  offset: number = 10;
  totalPages: number = 0;

  private roomService = inject(RoomsService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      const currentFilters = changes['filters'].currentValue;

      if (currentFilters) this.getAll(currentFilters);
    }
  }

  ngOnInit(): void {
    this.getAll({ page: 1 } as IParamsPaginate);
  }

  getAll(filters: IParamsPaginate): void {
    this.rooms = [];
    if (filters?.page) this.page = filters.page;
    else {
      filters.page = 1;
      this.page = 1;
    }

    filters.offset = this.offset;

    this.filters = { ...this.filters, ...filters };

    this.roomService.getAll(this.filters).subscribe((resp: IResponseRooms) => {
      this.rooms = resp.data;
      this.totalPages = Math.ceil(resp.total / this.offset);
    });
  }

  onPageChange(page: number): void {
    this.getAll({ page } as IParamsPaginate);
  }
}
