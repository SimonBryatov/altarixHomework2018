import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ContentTypeInterceptorService} from './services/content-type-interceptor.service';
import { ErrorComponent } from './components/error/error.component';
import { TimeoutInterceptor } from './services/timeout-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [HeaderComponent, StartComponent, ErrorComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeoutInterceptor,
      multi: true
    }
  ],
  exports: [RouterModule, HeaderComponent, ErrorComponent]
})
export class CoreModule { }
