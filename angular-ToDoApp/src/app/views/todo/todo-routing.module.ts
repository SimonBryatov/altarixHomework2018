import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { AuthGuard } from 'src/app/core/services/auth.guard';

const routes: Routes = [
{
  path: '', 
  component: TodoListComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'addTodo', 
  component: AddTodoComponent,
  canActivate: [AuthGuard] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TodoRoutingModule { }
