// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '../../../core/services';
import { ElementRef } from '@angular/core';

// Project imports
import { generateOneRoom } from '../../../core/models';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockModalService: jasmine.SpyObj<ModalService>;
  let mockElementRef: jasmine.SpyObj<ElementRef>;

  beforeEach(async () => {
    mockModalService = jasmine.createSpyObj('ModalService', ['close']);
    mockElementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        { provide: ModalService, useValue: mockModalService },
        { provide: ElementRef, useValue: mockElementRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalOptions on ngOnInit', () => {
    const room = generateOneRoom();

    const modalOptions = {
      title: 'Edit',
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      params: { ...room },
      accept: () => {},
      close: () => {},
    };

    mockModalService.modalOptions = modalOptions;
    component.ngOnInit();
    expect(component.modalOptions).toEqual(modalOptions);
  });

  it('should call modalService.close() on escape key press', () => {
    component.onEscape();
    expect(mockModalService.close).toHaveBeenCalled();
  });

  it('should remove element on close()', () => {
    component.close();
    expect(mockModalService.modalOptions).toBeUndefined();
  });

  it('should call modalService.close() and modalOptions.close() on onClose()', () => {
    const closeFn = jasmine.createSpy('close');
    component.modalOptions = { close: closeFn } as any;
    component.onClose();
    expect(mockModalService.close).toHaveBeenCalled();
    expect(closeFn).toHaveBeenCalled();
  });

  it('should call modalOptions.accept() on onAccept()', () => {
    const acceptFn = jasmine.createSpy('accept');
    component.modalOptions = { accept: acceptFn } as any;
    component.onAccept();
    expect(acceptFn).toHaveBeenCalled();
  });
});
