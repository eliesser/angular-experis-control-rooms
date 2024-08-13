// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

// Project imports
import { RoomFormComponent } from './room-form.component';
import { ModalService, RoomsService } from '../../../shared/services';
import { ReactiveFormsModule } from '@angular/forms';
import { getText, mockObservable, setInputValue } from '../../../../testing';
import { Room } from '../../../shared/models/room';
import { Injectable } from '@angular/core';

describe('RoomFormComponent', () => {
  let component: RoomFormComponent;
  let fixture: ComponentFixture<RoomFormComponent>;
  let modalService: jasmine.SpyObj<ModalService>;
  let roomsService: jasmine.SpyObj<RoomsService>;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);
    const roomsServiceSpy = jasmine.createSpyObj('RoomsService', [
      'create',
      'isAvailableByEmail',
    ]);

    await TestBed.configureTestingModule({
      declarations: [RoomFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: ModalService, useValue: modalServiceSpy },
        { provide: RoomsService, useValue: roomsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomFormComponent);
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    roomsService = TestBed.inject(RoomsService) as jasmine.SpyObj<RoomsService>;
    component = fixture.componentInstance;

    fixture.detectChanges();

    component.form.patchValue({
      name: '',
      floor: 1,
      capacity: 2,
      occupancy: 0,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the nameField be invalid', () => {
    component.nameField?.setValue('');

    expect(component.nameField?.invalid).toBeTruthy();
  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: '',
      image: 'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
      capacity: 16,
      occupancy: 7,
      floor: 4,
    });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should the nameField be invalid from UI', () => {
    setInputValue(fixture, 'name', '', true);

    fixture.detectChanges();

    expect(component.nameField?.invalid).toBeTruthy();

    expect(getText(fixture, 'nameHasError')).toContain('*Required');
  });

  it('should send the form successfully create', () => {
    const mockRoomWithoutId = {
      name: 'Test',
      image: 'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
      capacity: 16,
      occupancy: 7,
      floor: 4,
    };
    const mockRoom: Room = {
      id: 'a3bda92f-523d-4d99-9823-63076e1758c5',
      ...mockRoomWithoutId,
    };

    component.form.patchValue(mockRoomWithoutId);

    roomsService.create.and.returnValue(mockObservable(mockRoom));

    component.onSave();

    expect(component.form.valid).toBeTruthy();
    expect(roomsService.create).toHaveBeenCalled();
  });

  it('should send the form invalid create', () => {
    const mockRoomWithoutId = {
      name: '',
      image: 'https://via.placeholder.com/240x180/66ef8b/eb61ef.png?text=',
      capacity: 16,
      occupancy: 7,
      floor: 4,
    };
    const mockRoom: Room = {
      id: 'a3bda92f-523d-4d99-9823-63076e1758c5',
      ...mockRoomWithoutId,
    };

    component.form.patchValue(mockRoomWithoutId);

    roomsService.create.and.returnValue(mockObservable(mockRoom));

    component.onSave();

    expect(component.form.invalid).toBeTruthy();
  });
});
