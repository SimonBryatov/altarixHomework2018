import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { StartComponent } from './components/start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ContentTypeInterceptorService} from './services/content-type-interceptor.service';
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [TodoListComponent, TodoComponent, LoginComponent, HeaderComponent, AddTodoComponent, RegisterComponent, StartComponent, ErrorComponent, LoaderComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptorService,
      multi: true
    }
  ],
  exports: [RouterModule, HeaderComponent, ErrorComponent, LoaderComponent]
})
export class CoreModule { }
