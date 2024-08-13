// Angular imports
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

// Third Party Libraries imports
import { finalize, Observable } from 'rxjs';

// Project imports
import { LoadingService } from '../../services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private countRequest: number = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.countRequest === 0) {
      this.loadingService.isLoadingSet(true);
    }

    this.countRequest++;

    return next.handle(req).pipe(
      finalize(() => {
        this.countRequest--;
        if (this.countRequest === 0) {
          this.loadingService.isLoadingSet(false);
        }
      })
    );
  }
}
