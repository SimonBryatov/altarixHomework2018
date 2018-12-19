import { Injectable } from '@angular/core';
import {ErrorService} from './error.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { BehaviorSubject, of } from 'rxjs';
import { share, map, tap, catchError } from 'rxjs/operators';

export interface ToDo {
  _id: string,
  caption: string,
  status: string,
  createdAt: string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'https://todohub.herokuapp.com' //'http://localhost:8080' 
  private todosSubject = new BehaviorSubject([]);
  todos$ = this.todosSubject.asObservable();
  constructor(private http: HttpClient, private errorService: ErrorService, private router: Router, private loaderService: LoaderService) {}
  
  reset() {
    this.todosSubject.next([]);
  }

  filterTodosAndSave(todos: ToDo[]) {
    const completedTodos: ToDo[] = [];
    const incompletedTodos: ToDo[] = [];
    todos.map((todo) => {
      if (todo.status === 'completed') {
        completedTodos.push(todo);
      } else {
        incompletedTodos.push(todo);
      }
    })
    this.todosSubject.next(incompletedTodos.concat(completedTodos));
  }
  
  getUserTodos() {
    this.loaderService.start();
    const userTodos$ = this.http.get<string>(`${this.baseUrl}/getUserToDoEntries`).pipe(share());
    userTodos$.pipe(
      map(data => JSON.parse(data)),
      tap(({todos}) => this.filterTodosAndSave(todos)),
      tap(() => this.loaderService.stop()),
      catchError((err) => {
        this.errorService.parseError(err);
        return of(err);
        })
    ).subscribe();
  }

  addToDo(caption: string) {
    this.loaderService.start();
      const response$ = this.http.post(`${this.baseUrl}/addTodo`, caption);
      response$.pipe(
        tap(() => this.getUserTodos()),
        tap(() => this.router.navigate(['todoList'])),
        catchError((err) => {
          this.errorService.parseError(err);
          return of(err);
          })
      ).subscribe();
  }

  toggleToDo(todoId: string, newStatus: string) {
    this.loaderService.start();
      const response$ = this.http.post(`${this.baseUrl}/updateTodoStatus`, {todoId, newStatus});
      response$.pipe(
        tap(() => this.getUserTodos()),
        catchError((err) => {
          this.errorService.parseError(err);
          return of(err);
          })
      ).subscribe();
  }

  deleteToDo(todoId: string) {
    this.loaderService.start();
      const response$ = this.http.delete(`${this.baseUrl}/deleteTodo` + todoId);
      response$.pipe(
        tap(() => this.getUserTodos()),
        catchError((err) => {
          this.errorService.parseError(err);
          return of(err);
          })
      ).subscribe();
  }
}
