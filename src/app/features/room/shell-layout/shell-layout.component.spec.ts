// Angular imports
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

// Project imports
import { ShellLayoutComponent } from './shell-layout.component';
import { RoomListComponent, RoomPanelFilterComponent } from '..';
import { ModalService } from '../../../core/services';
import { generateOneRoom, IParamsFilters } from '../../../core/models';

describe('ShellLayoutComponent', () => {
  let component: ShellLayoutComponent;
  let fixture: ComponentFixture<ShellLayoutComponent>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const modalServiceSpy = jasmine.createSpyObj('ModalService', ['open']);
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ShellLayoutComponent,
        RoomPanelFilterComponent,
        RoomListComponent,
      ],
      providers: [
        provideHttpClient(),
        { provide: ModalService, useValue: modalServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellLayoutComponent);
    modalService = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openModal()', fakeAsync(() => {
    const mockData = generateOneRoom();

    component.openModal(mockData);

    expect(modalService.open).toHaveBeenCalled();
  }));

  it('should call openModal() without data', fakeAsync(() => {
    component.openModal();

    expect(modalService.open).toHaveBeenCalled();
  }));

  it('should call setFilters()', fakeAsync(() => {
    const filters: IParamsFilters = { name: 'Test' };

    component.setFilters(filters);

    expect(component.filters.name).toEqual('Test');
  }));
});
