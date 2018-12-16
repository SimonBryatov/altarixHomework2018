import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeInterceptorService {
  
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let jwt = Cookies.get('jwt');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': jwt ? jwt : ''
    });
    const clone = req.clone({headers});
    return next.handle(clone);
  }
}
