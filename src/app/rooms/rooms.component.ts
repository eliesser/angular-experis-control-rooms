import { Component } from '@angular/core';
import {
  IParamsFilters,
  IParamsPaginate,
} from '../shared/interfaces/room.interface';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
})
export class RoomsComponent {
  filters!: IParamsPaginate;
  visiblePanel: boolean = false;

  setFilters(filters: IParamsFilters) {
    this.visiblePanel = false;
    this.filters = filters as IParamsPaginate;
  }
}
