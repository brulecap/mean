import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Sequence1Component } from './sequence1/sequence1.component';
import { Sequence2Component } from './sequence2/sequence2.component';
import { DifferenceComponent } from './difference/difference.component';

import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
    Sequence1Component,
    Sequence2Component,
    DifferenceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
