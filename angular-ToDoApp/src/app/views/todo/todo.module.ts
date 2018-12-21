import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoRoutingModule } from './todo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoComponent, TodoListComponent, AddTodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoModule { }
