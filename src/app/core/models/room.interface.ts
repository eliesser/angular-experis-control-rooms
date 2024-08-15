import { Room } from '.';

export interface IResponseRoom {
  data: Room[];
  total: number;
}

export interface IParamsFilters {
  name?: string;
  capacity?: number;
  occupancy?: number;
  floor?: number[];
}

export interface IParamsPaginate extends IParamsFilters {
  page: number;
  offset: number;
}
