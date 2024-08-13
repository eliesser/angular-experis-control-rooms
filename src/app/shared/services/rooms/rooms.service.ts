// Angular imports
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// Third Party Libraries imports
import { Observable } from 'rxjs';

// Project imports
import { environment } from '../../../../environments/environment';
import {
  IParamsPaginate,
  IResponseRooms,
} from '../../interfaces/room.interface';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private urlApi: string = `${environment.urlApi}/room`;
  private http: HttpClient = inject(HttpClient);

  getAll({ floor, ...filters }: IParamsPaginate): Observable<IResponseRooms> {
    let params: HttpParams = new HttpParams({
      fromObject: {
        ...filters,
        ...(JSON.stringify(floor) ? { floor: JSON.stringify(floor) } : {}),
      },
    });
    return this.http.get<IResponseRooms>(this.urlApi, {
      params,
    });
  }

  create(payload: Room): Observable<Room> {
    return this.http.post<Room>(this.urlApi, { ...payload }, {});
  }

  update(id: string, payload: Room): Observable<Room> {
    return this.http.patch<Room>(`${this.urlApi}/${id}`, { ...payload }, {});
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.urlApi}/${id}`, {});
  }
}
