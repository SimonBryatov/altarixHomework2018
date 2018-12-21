import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from 'src/app/core/services/anonymous.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'login',
  canActivate: [AnonymousGuard]  
},
{
  path: 'register', 
  component: RegisterComponent,
  canActivate: [AnonymousGuard]  
},
{
  path: 'login', 
  component: LoginComponent,
  canActivate: [AnonymousGuard]  
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
