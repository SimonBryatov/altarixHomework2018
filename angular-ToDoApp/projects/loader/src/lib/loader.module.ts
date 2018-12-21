import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LoaderComponent],
  imports: [
    BrowserModule
  ],
  exports: [LoaderComponent]
})
export class LoaderModule { }
