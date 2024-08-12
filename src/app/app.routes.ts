import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'rooms',
    loadChildren: () =>
      import('./rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
];
