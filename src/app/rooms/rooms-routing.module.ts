// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project imports
import { RoomsComponent } from './rooms.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
