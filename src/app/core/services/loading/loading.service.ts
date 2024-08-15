// Angular imports
import { Injectable } from '@angular/core';

// Third Party Libraries imports
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject(false);
  }

  isLoadingWatch(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  isLoadingSet(value: boolean) {
    this.isLoading.next(value);
  }
}
