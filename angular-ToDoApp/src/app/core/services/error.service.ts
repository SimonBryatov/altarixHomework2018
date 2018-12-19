import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage: string;
  constructor(private loaderService: LoaderService) { }

  parseError(err) {
    this.loaderService.stop();
    if (err.statusText) {
      this.handleCustomError(err.statusText);
    } else {
      this.handleNetworkError();
    }
  }

  handleCustomError(msg) {
    this.errorMessage = msg;
    this.resetMessage();
  }

  handleNetworkError() {
    this.errorMessage = 'Что-то пошло не так. Попробуйте снова :('
    this.resetMessage();
  }

  resetMessage() {
    setTimeout(() => {this.errorMessage = ''}, 2000)
  }
}
