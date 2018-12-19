import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Cookies from 'js-cookie';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';
import { LoaderService } from './loader.service';
import {share, tap, map, catchError} from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

interface Credentials {
  login: string,
  password: string,
  email: string
}

interface ResponseData {
  token: string,
  userLogin: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://todohub.herokuapp.com'  //'http://localhost:8080' 
  private authStatusSubject = new BehaviorSubject(!!Cookies.get('jwt'));
  private userNameSubject = new BehaviorSubject(Cookies.get('username'));
  
  authStatus$ = this.authStatusSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService, private router: Router, private todoService: TodoService, private loaderService: LoaderService) { 
  }

  saveCredentialsAndProceed(data: ResponseData) {
      Cookies.set('jwt', data.token);
      Cookies.set('userName', data.userLogin)
      this.authStatusSubject.next(true);
      this.userNameSubject.next(data.userLogin);
      this.router.navigate(['todoList']);
  }

  register(credentials: Credentials) {
    this.loaderService.start();
      const register$ = this.http.post<string>(`${this.baseUrl}/register`, JSON.stringify(credentials)).pipe(share());
      register$.pipe(
        map(data => JSON.parse(data)),
        tap((data) => this.saveCredentialsAndProceed(data)),  
        tap(() => this.loaderService.stop()),
        catchError((err) => {
          this.errorService.parseError(err);
          return of(err);
          })
      ).subscribe();
  }

  login(credentials: Credentials) {
    this.loaderService.start()
    const login$ = this.http.post<string>(`${this.baseUrl}/login`, JSON.stringify(credentials)).pipe(share())
    login$.pipe(
      map(data => JSON.parse(data)),
      tap((data) => this.saveCredentialsAndProceed(data)),
      tap(() => this.loaderService.stop()),
      catchError((err) => {
        this.errorService.parseError(err);
        return of(err);
        })
    ).subscribe();
  }

  logout() {
    Cookies.remove('jwt');
    Cookies.remove('userName');
    this.authStatusSubject.next(false);
    this.userNameSubject.next('');
    this.todoService.reset();
  }

}
