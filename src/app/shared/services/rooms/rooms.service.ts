import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  IParamsPaginate,
  IResponseRooms,
} from '../../interfaces/room.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private http = inject(HttpClient);

  getAll(filters: IParamsPaginate): Observable<IResponseRooms> {
    return this.http.get<IResponseRooms>(`${environment.urlApi}/rooms`, {});
  }
}
