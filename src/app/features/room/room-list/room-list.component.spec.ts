// Angular imports
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgFor } from '@angular/common';
import { SimpleChanges, SimpleChange } from '@angular/core';

// Project imports
import { RoomService } from '../../../core/services';
import {
  generateManyRooms,
  generateOneRoom,
  IResponseRoom,
} from '../../../core/models';
import { PaginatorComponent } from '../../../shared/components';
import { RoomCardComponent, RoomListComponent } from '..';
import { mockObservable } from '../../../../testing';

describe('RoomListComponent', () => {
  let component: RoomListComponent;
  let fixture: ComponentFixture<RoomListComponent>;
  let roomService: jasmine.SpyObj<RoomService>;

  const NUM_ROMS = 10;
  const roomsMock: IResponseRoom = {
    data: generateManyRooms(NUM_ROMS),
    total: NUM_ROMS,
  };

  beforeEach(async () => {
    const roomServiceSpy = jasmine.createSpyObj<RoomService>('RoomService', [
      'getAll',
      'delete',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        NgFor,
        RoomListComponent,
        RoomCardComponent,
        PaginatorComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RoomService, useValue: roomServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomListComponent);
    component = fixture.componentInstance;

    roomService = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;

    roomService.getAll.and.returnValue(mockObservable(roomsMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return room list from service', fakeAsync(() => {
    fixture.detectChanges();

    expect(roomService.getAll).toHaveBeenCalled();
    expect(component.rooms.length).toEqual(NUM_ROMS);
  }));

  it('should call onPageChange()', fakeAsync(() => {
    roomService.getAll.and.returnValue(mockObservable(roomsMock));

    component.onPageChange(1);
    fixture.detectChanges();

    expect(component.rooms.length).toEqual(NUM_ROMS);
  }));

  it('should call openModal()', fakeAsync(() => {
    const mockData = generateOneRoom();

    spyOn(component.openModalEmit, 'emit');

    component.openModal(mockData);

    expect(component.rooms.length).toEqual(NUM_ROMS);

    expect(component.openModalEmit.emit).toHaveBeenCalledWith(mockData);
  }));

  it('should call onDelete()', fakeAsync(() => {
    roomService.delete.and.returnValue(mockObservable(true));

    component.onDelete('1');
    fixture.detectChanges();

    expect(roomService.delete).toHaveBeenCalled();
  }));

  it('should call getAll when filters change with a value', () => {
    spyOn(component, 'getAll');

    const newFilters = { page: 1, offset: 10 };

    const changes: SimpleChanges = {
      filters: new SimpleChange(null, newFilters, true),
    };

    component.ngOnChanges(changes);

    expect(component.getAll).toHaveBeenCalledWith(newFilters);
  });
});
