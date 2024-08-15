// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Project imports
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onGoToPage()', () => {
    spyOn(component.pageChange, 'emit');

    component.onGoToPage(1);

    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should call onPreviousPage()', () => {
    spyOn(component.pageChange, 'emit');

    component.page = 2;

    component.onPreviousPage();

    expect(component.pageChange.emit).toHaveBeenCalled();
  });

  it('should call onNextPage()', () => {
    spyOn(component.pageChange, 'emit');

    component.page = 1;
    component.totalPages = 2;

    component.onNextPage();

    expect(component.pageChange.emit).toHaveBeenCalled();
  });
});
