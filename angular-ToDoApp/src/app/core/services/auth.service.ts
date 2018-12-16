import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Cookies from 'js-cookie';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';
import { LoaderService } from './loader.service';
import withLoader from '../utils/withLoader';

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
  
  userName = ''

  constructor(private http: HttpClient, private errorService: ErrorService, private router: Router, private todoService: TodoService, private loaderService: LoaderService) { 
    const userName = Cookies.get('userName');
    if (userName) {
      this.userName = userName;
      this.router.navigate(['todoList']);
    }
  }

  saveCredentialsAndProceed(data: ResponseData) {
      Cookies.set('jwt', data.token);
      Cookies.set('userName', data.userLogin)
      this.userName = data.userLogin;
      this.router.navigate(['todoList']);
  }

  async register(credentials: Credentials) {
    try {
      const response = await this.http.post('https://todohub.herokuapp.com/register', JSON.stringify(credentials)).toPromise() as string;
      const data: ResponseData = JSON.parse(response);
      this.saveCredentialsAndProceed(data);
    } catch(err) {
      this.errorService.handleResponseError(err);
    }
  }

  async login(credentials: Credentials) {
    try {
    const response = await this.http.post('https://todohub.herokuapp.com/login', JSON.stringify(credentials)).toPromise() as string;
    const data: ResponseData = JSON.parse(response);
    this.saveCredentialsAndProceed(data);
    } catch(err) {
      this.errorService.handleResponseError(err);
    }
  }

  logout() {
    Cookies.remove('jwt');
    Cookies.remove('userName');
    this.userName = '';
    this.todoService.todos = [];
  }

}
