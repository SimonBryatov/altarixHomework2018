import {Injectable} from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
//import { ErrorService } from './error.service';
//import { of } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(timeout(5000))
  }
}

// , catchError((err) => {
//   if (!err.statusText) {
//     this.errorService.handleCustomError('Повторите снова :(');
//    }
//   return of(null)
// })