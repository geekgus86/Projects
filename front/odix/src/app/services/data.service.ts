import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private loading = new BehaviorSubject<boolean>(true);
  currentLoading = this.loading.asObservable();

  constructor() { }

  // stop loading
  stopLoading() {
    this.loading.next(false);
  }

  startLoading() {
    this.loading.next(true);
  }
}
