import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {
  form = new FormGroup({
    caption: new FormControl('Доделать Апп', [Validators.required])
  })
  constructor(private todoService: TodoService) { }

  submit() {
    this.todoService.addToDo(this.form.value);
  }
}
