// Angular imports
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgFor } from '@angular/common';

// Project imports
import { IParamsPaginate, IResponseRoom, Room } from '../../../core/models';
import { RoomService } from '../../../core/services';
import { RoomCardComponent } from '../room-card/room-card.component';
import { PaginatorComponent } from '../../../shared/components';

@Component({
  standalone: true,
  imports: [NgFor, RoomCardComponent, PaginatorComponent],
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  @Input() filters!: IParamsPaginate;
  @Output() openModalEmit: EventEmitter<Room> = new EventEmitter<Room>();

  room!: Room[];
  page: number = 1;
  offset: number = 10;
  totalPages: number = 0;

  private roomService: RoomService = inject(RoomService);

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
    this.room = [];
    if (filters?.page) this.page = filters.page;
    else {
      filters.page = 1;
      this.page = 1;
    }

    filters.offset = this.offset;

    this.filters = { ...this.filters, ...filters };

    this.roomService.getAll(this.filters).subscribe((resp: IResponseRoom) => {
      this.room = resp.data;
      this.totalPages = Math.ceil(resp.total / this.offset);
    });
  }

  onPageChange(page: number): void {
    this.getAll({ page } as IParamsPaginate);
  }

  openModal(room: Room): void {
    this.openModalEmit.emit(room);
  }

  onDelete(id: string): void {
    this.roomService.delete(id).subscribe(() => {
      this.room = this.room.filter((room) => room.id !== id);
    });
  }
}
