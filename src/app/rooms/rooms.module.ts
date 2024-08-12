import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RoomsRoutingModule } from './rooms-routing.module';

import { RoomsComponent } from './rooms.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomPanelFilterComponent } from './components/room-panel-filter/room-panel-filter.component';
import { RoomCardComponent } from './components/room-card/room-card.component';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomListComponent,
    RoomPanelFilterComponent,
    RoomCardComponent,
  ],
  imports: [CommonModule, RouterModule, RoomsRoutingModule],
})
export class RoomsModule {}
