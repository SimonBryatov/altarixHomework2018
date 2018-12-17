import { Injectable } from '@angular/core';
import {ErrorService} from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

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
  todos: ToDo[];
  constructor(private http: HttpClient, private errorService: ErrorService, private router: Router, private loaderService: LoaderService) {}
  
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
    this.todos = incompletedTodos.concat(completedTodos);
  }
  
    async getUserTodos() {
    this.loaderService.start();
    try {
    let response = await this.http.get('https://todohub.herokuapp.com/getUserToDoEntries').toPromise() as string;
    this.filterTodosAndSave(JSON.parse(response).todos);
    } catch (err) {
      this.errorService.handleResponseError(err);
    }
    this.loaderService.stop();
  }

  async addToDo(caption: string) {
    this.loaderService.start();
    try {
      let response = await this.http.post('https://todohub.herokuapp.com/addTodo', caption).toPromise() as string;
      this.getUserTodos();
      this.router.navigate(['todoList']);
    } catch(err) {
      this.errorService.handleResponseError(err)
      this.loaderService.stop();
    }
  }

  async toggleToDo(todoId: string, newStatus: string) {
    this.loaderService.start();
    try {
      let response = await this.http.post('https://todohub.herokuapp.com/updateTodoStatus', {todoId, newStatus}).toPromise() as string;
      this.getUserTodos();
    } catch(err) {
      this.errorService.handleResponseError(err)
      this.loaderService.stop();
    }
  }

  async deleteToDo(todoId: string) {
    this.loaderService.start();
    try {
      let response = await this.http.delete('https://todohub.herokuapp.com/deleteTodo' + todoId).toPromise() as string;
      this.getUserTodos();
    } catch(err) {
      this.errorService.handleResponseError(err)
      this.loaderService.stop();
    }
  }
}
