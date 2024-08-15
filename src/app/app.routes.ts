// Angular imports
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'room',
    loadChildren: () =>
      import('./features/room/room.routes').then((r) => r.ROOM_ROUTES),
  },
  {
    path: '',
    redirectTo: 'room',
    pathMatch: 'full',
  },
];
