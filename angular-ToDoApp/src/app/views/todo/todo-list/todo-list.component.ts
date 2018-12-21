import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$ = this.todoService.todos$
  constructor(public todoService: TodoService) { }

  async ngOnInit() {
    this.todoService.getUserTodos();
  }

}
