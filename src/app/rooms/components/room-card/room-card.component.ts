import { Component, Input } from '@angular/core';
import { Room } from '../../../shared/models/room';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
})
export class RoomCardComponent {
  @Input() room!: Room;
}
