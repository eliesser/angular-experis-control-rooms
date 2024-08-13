// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

// Project imports
import { RoomFormComponent } from './room-form.component';
import { ModalService } from '../../../shared/services';
import { ReactiveFormsModule } from '@angular/forms';

describe('RoomFormComponent', () => {
  let component: RoomFormComponent;
  let fixture: ComponentFixture<RoomFormComponent>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);

    await TestBed.configureTestingModule({
      declarations: [RoomFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: ModalService, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomFormComponent);
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
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
});
