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

  setFilters(filters: IParamsFilters) {
    this.filters = filters as IParamsPaginate;
  }
}
