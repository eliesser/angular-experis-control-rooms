// Angular imports
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Project imports
import { PrivateShellLayoutComponent } from './private-shell-layout.component';

describe('PrivateShellLayoutComponent', () => {
  let component: PrivateShellLayoutComponent;
  let fixture: ComponentFixture<PrivateShellLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateShellLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateShellLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
