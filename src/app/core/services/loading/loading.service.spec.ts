// Angular imports
import { TestBed } from '@angular/core/testing';

// Project imports
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should call isLoadingWatch', (doneFn) => {
    loadingService.isLoadingSet(true);

    loadingService.isLoadingWatch().subscribe((value: boolean) => {
      expect(value).toBeTrue();
      doneFn();
    });
  });
});
