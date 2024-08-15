// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Project imports
import { RoomFormComponent } from './room-form.component';
import { getText, mockObservable, setInputValue } from '../../../../testing';
import { generateOneRoom, Room } from '../../../core/models';
import { ModalService, RoomService } from '../../../core/services';

describe('RoomFormComponent', () => {
  let component: RoomFormComponent;
  let fixture: ComponentFixture<RoomFormComponent>;
  let roomService: jasmine.SpyObj<RoomService>;
  let modalService: jasmine.SpyObj<ModalService>;

  const roomMock = generateOneRoom();

  const modalOptions = {
    title: 'Edit',
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel',
    params: { ...roomMock },
    accept: () => {},
    close: () => {},
  };

  beforeEach(async () => {
    const roomServiceSpy = jasmine.createSpyObj('RoomService', [
      'create',
      'update',
      'isAvailableByEmail',
    ]);
    const modalServiceSpy = jasmine.createSpyObj('ModalService', [
      'open',
      'modalOptions',
    ]);

    modalServiceSpy.modalOptions = modalOptions;

    await TestBed.configureTestingModule({
      imports: [RoomFormComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: RoomService, useValue: roomServiceSpy },
        { provide: ModalService, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    roomService = TestBed.inject(RoomService) as jasmine.SpyObj<RoomService>;

    fixture = TestBed.createComponent(RoomFormComponent);
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

    modalService.modalOptions!.params.id = undefined;

    component.form.patchValue(mockRoomWithoutId);

    roomService.create.and.returnValue(mockObservable(mockRoom));

    component.onSave();

    expect(component.form.valid).toBeTruthy();
    expect(roomService.create).toHaveBeenCalled();
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

    roomService.create.and.returnValue(mockObservable(mockRoom));

    component.onSave();

    expect(component.form.invalid).toBeTruthy();
  });

  it('should call create method on save if no id is present', () => {
    modalService.modalOptions!.params.id = undefined;

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

    roomService.create.and.returnValue(mockObservable(mockRoom));

    component.onSave();

    expect(roomService.create).toHaveBeenCalledWith(component.form.value);
  });
});
