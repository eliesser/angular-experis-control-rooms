// Angular imports
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

// Project imports
import { LoadingService } from '../../services/loading/loading.service';
import { LoadingInterceptor } from './loading.interceptor';

describe('LoadingInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let httpClient: HttpClient;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoadingService', ['isLoadingSet']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: LoadingService, useValue: spy },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should set loading state when a request is made and clear it when completed', () => {
    loadingService.isLoadingSet.calls.reset();

    httpClient.get('/test').subscribe();

    expect(loadingService.isLoadingSet).toHaveBeenCalledWith(true);

    httpTestingController.expectOne('/test').flush({});

    expect(loadingService.isLoadingSet).toHaveBeenCalledWith(false);
  });
});
