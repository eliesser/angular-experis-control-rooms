// Angular imports
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

// Project imports
import { RoomService } from './room.service';
import { environment } from '../../../../environments/environment';
import { IResponseRoom, Room } from '../../models';

describe('RoomService', () => {
  let roomService: RoomService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    roomService = TestBed.inject(RoomService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(roomService).toBeTruthy();
  });

  describe('Test for getAll() method', () => {
    it('should call with floor', (doneFn) => {
      const mockData: IResponseRoom = {
        data: [
          {
            id: 'a3bda92f-523d-4d99-9823-63076e1758c5',
            name: 'Room blah',
            image:
              'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
            capacity: 16,
            occupancy: 7,
            floor: 4,
          },
        ],
        total: 1,
      };

      const params = { page: 1, offset: 1, floor: [1] };

      roomService.getAll(params).subscribe({
        next: (data) => {
          expect(data).toEqual(mockData);
          doneFn();
        },
        error: (error) => {
          doneFn.fail('Request failed');
        },
      });

      const url = `${environment.urlApi}/room?page=${params.page}&offset=${
        params.offset
      }&floor=${encodeURIComponent(JSON.stringify(params.floor))}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });

    it('should call without floor', (doneFn) => {
      const mockData: IResponseRoom = {
        data: [
          {
            id: 'a3bda92f-523d-4d99-9823-63076e1758c5',
            name: 'Room blah',
            image:
              'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
            capacity: 16,
            occupancy: 7,
            floor: 4,
          },
        ],
        total: 1,
      };

      const params = { page: 1, offset: 1 };

      roomService.getAll(params).subscribe({
        next: (data) => {
          expect(data).toEqual(mockData);
          doneFn();
        },
        error: (error) => {
          doneFn.fail('Request failed');
        },
      });

      const url = `${environment.urlApi}/room?page=${params.page}&offset=${params.offset}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });
  });

  it('should call create() method', (doneFn) => {
    const mockData: Room = {
      id: 'a3bda92f-523d-4d99-9823-63076e1758c5',
      name: 'Room blah',
      image: 'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
      capacity: 16,
      occupancy: 7,
      floor: 4,
    };

    roomService.create(mockData).subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        doneFn();
      },
      error: (error) => {
        doneFn.fail('Request failed');
      },
    });

    const url = `${environment.urlApi}/room`;
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(mockData);
  });

  it('should call update() method', (doneFn) => {
    const mockData: Room = {
      id: 'a3bda92f-523d-4d99-9823-63076e1758c5',
      name: 'Room blah',
      image: 'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
      capacity: 16,
      occupancy: 7,
      floor: 4,
    };

    roomService.update(mockData.id, mockData).subscribe({
      next: (data) => {
        expect(data).toEqual(mockData);
        doneFn();
      },
      error: (error) => {
        doneFn.fail('Request failed');
      },
    });

    const url = `${environment.urlApi}/room/${mockData.id}`;
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('PATCH');
    req.flush(mockData);
  });

  it('should call delete() method', (doneFn) => {
    const id: string = 'a3bda92f-523d-4d99-9823-63076e1758c5';

    roomService.delete(id).subscribe({
      next: (data) => {
        expect(data).toEqual(true);
        doneFn();
      },
      error: (error) => {
        doneFn.fail('Request failed');
      },
    });

    const url = `${environment.urlApi}/room/${id}`;
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(true);
  });
});
