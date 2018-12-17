import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage: string;
  constructor() { }

  handleResponseError(err) {
    if (err.statusText) {
    this.errorMessage = err.statusText;
    this.resetMessage()
    }
  }

  handleCustomError(msg) {
    this.errorMessage = msg;
    this.resetMessage();
  }

  resetMessage() {
    setTimeout(() => {this.errorMessage = ''}, 2000)
  }
}
