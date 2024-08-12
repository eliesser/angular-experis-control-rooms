import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RoomsRoutingModule } from './rooms-routing.module';

import { RoomsComponent } from './rooms.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomPanelFilterComponent } from './components/room-panel-filter/room-panel-filter.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { CapacityOccupancyPipe } from '../shared/pipes/capacityOccupancy/capacity-occupancy.pipe';
import { LoadingComponent } from '../components/loading/loading.component';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomListComponent,
    RoomPanelFilterComponent,
    RoomCardComponent,
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
