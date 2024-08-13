// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Project imports
import { RoomsComponent } from './rooms.component';
import { ModalService } from '../shared/services';
import { RoomListComponent, RoomPanelFilterComponent } from './components';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);

    await TestBed.configureTestingModule({
      declarations: [
        RoomsComponent,
        RoomPanelFilterComponent,
        RoomListComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        { provide: ModalService, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsComponent);
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
