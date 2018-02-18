import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RandomStringPipe } from './random-string.pipe';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    RandomStringPipe
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    RandomStringPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
