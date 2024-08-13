// Angular imports
import { Component, EventEmitter, Input, Output } from '@angular/core';

// Project imports
import { Room } from '../../../shared/models/room';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  @Input() room!: Room;
  @Output() openModalEmit: EventEmitter<Room> = new EventEmitter<Room>();
  @Output() removeEmit: EventEmitter<string> = new EventEmitter<string>();

  onEdit(): void {
    this.openModalEmit.emit(this.room);
  }

  onRemove(): void {
    this.removeEmit.emit(this.room.id);
  }
}
