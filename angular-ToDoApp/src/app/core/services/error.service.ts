import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage: string;
  constructor() { }

  handleResponseError(err) {
    this.errorMessage = err.statusText;
    setTimeout(() => {this.errorMessage = ''}, 2000)
  }
}
