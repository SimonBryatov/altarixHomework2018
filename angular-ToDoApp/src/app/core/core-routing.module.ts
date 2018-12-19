import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {AddTodoComponent} from './components/add-todo/add-todo.component';
import {StartComponent} from './components/start/start.component'
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from './services/auth.guard';
import {AnonymousGuard} from './services/anonymous.guard';

const routes: Routes = [{
  path: '',
  component: StartComponent,
  canActivate: [AnonymousGuard]  
},{
  path: 'register', 
  component: RegisterComponent,
  canActivate: [AnonymousGuard]  
},{
  path: 'login', 
  component: LoginComponent,
  canActivate: [AnonymousGuard]  
},
{
  path: 'todoList', 
  component: TodoListComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'addTodo', 
  component: AddTodoComponent,
  canActivate: [AuthGuard] 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
