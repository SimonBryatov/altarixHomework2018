import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading = false
  constructor() { }
  start() {
    this.loading = true
  }
  stop() {
    this.loading = false
  }
}

