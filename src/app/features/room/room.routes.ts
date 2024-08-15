// Angular imports
import { Routes } from '@angular/router';

// Project imports
import { PrivateShellLayoutComponent } from '../../shared/components';
import { ShellLayoutComponent } from './shell-layout/shell-layout.component';

export const ROOM_ROUTES: Routes = [
  {
    path: '',
    component: PrivateShellLayoutComponent,
    children: [{ path: '', component: ShellLayoutComponent }],
  },
];
