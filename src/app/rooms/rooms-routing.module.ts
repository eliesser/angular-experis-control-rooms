import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomsComponent } from './rooms.component';
import { RoomListComponent } from './components/room-list/room-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: RoomsComponent,
    children: [
      {
        path: '',
        component: RoomListComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
