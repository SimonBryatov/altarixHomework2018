import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from './components/start/start.component'
import {AuthGuard} from './services/auth.guard';
import {AnonymousGuard} from './services/anonymous.guard';

const routes: Routes = [{
  path: '',
  component: StartComponent,
  canActivate: [AnonymousGuard]  
},
{
  path: 'auth', 
  loadChildren: '../views/auth/auth.module#AuthModule',
  canActivate: [AnonymousGuard] 
},
{
  path: 'todoList', 
  loadChildren: '../views/todo/todo.module#TodoModule',
  canActivate: [AuthGuard]  
},
{
  path: '**',
  redirectTo: ''
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
