import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import {
  IParamsPaginate,
  IResponseRooms,
} from '../../interfaces/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private http = inject(HttpClient);

  getAll({ floor, ...filters }: IParamsPaginate): Observable<IResponseRooms> {
    let params = new HttpParams({
      fromObject: {
        ...filters,
        ...(JSON.stringify(floor) ? { floor: JSON.stringify(floor) } : {}),
      },
    });
    return this.http.get<IResponseRooms>(`${environment.urlApi}/rooms`, {
      params,
    });
  }
}
