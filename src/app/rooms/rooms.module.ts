// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Project imports
import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import {
  RoomListComponent,
  RoomPanelFilterComponent,
  RoomCardComponent,
  RoomFormComponent,
} from './components';
import { PaginatorComponent, LoadingComponent } from '../components';

import { CapacityOccupancyPipe } from '../shared/pipes';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomListComponent,
    RoomPanelFilterComponent,
    RoomCardComponent,
    RoomFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RoomsRoutingModule,
    ReactiveFormsModule,
    PaginatorComponent,
    CapacityOccupancyPipe,
    LoadingComponent,
  ],
})
export class RoomsModule {}
