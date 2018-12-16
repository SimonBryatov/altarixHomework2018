import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ErrorService } from '../../services/error.service';
import { ToDo } from '../../services/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  constructor(public todoService: TodoService, private errorService: ErrorService) { }

  async ngOnInit() {
    this.todoService.getUserTodos();
  }

}
