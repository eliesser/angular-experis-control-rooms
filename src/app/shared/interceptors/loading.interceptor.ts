import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { finalize } from 'rxjs';

import { LoadingService } from '../services/loading/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let countRequest = 0;

  const loadingService = inject(LoadingService);

  if (!countRequest) loadingService.isLoadingSet(true);

  countRequest++;

  return next(req).pipe(
    finalize(() => {
      countRequest--;
      if (!countRequest) loadingService.isLoadingSet(false);
    })
  );
};
