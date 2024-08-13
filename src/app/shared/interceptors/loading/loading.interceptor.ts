// Angular imports
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

// Third Party Libraries imports
import { finalize } from 'rxjs';

// Project imports
import { LoadingService } from '../../services/loading/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let countRequest: number = 0;

  const loadingService: LoadingService = inject(LoadingService);

  if (!countRequest) loadingService.isLoadingSet(true);

  countRequest++;

  return next(req).pipe(
    finalize(() => {
      countRequest--;
      if (!countRequest) loadingService.isLoadingSet(false);
    })
  );
};
