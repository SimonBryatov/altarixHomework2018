import { Component, OnInit, Input } from '@angular/core';
import { ToDo, TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input('todo') todo: ToDo 
  status = '' 
  constructor(private todoService: TodoService) { }

  setAction() {
    this.status = this.todo.status === 'incompleted' ? '' : '(Завершено)' 
  }

  chooseNewToDoStatus(): string {
    return this.todo.status === 'incompleted' ? 'completed' : 'incompleted'
  }

  toggle() {
    this.todoService.toggleToDo(this.todo._id, this.chooseNewToDoStatus());
  }

  delete(event: Event) {
    event.stopPropagation();
    this.todoService.deleteToDo(this.todo._id);
  }

  ngOnInit() {
    this.setAction();
  }

}
