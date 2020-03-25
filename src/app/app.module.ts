import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VisNetworkTreeComponent } from './vis-network-tree/vis-network-tree.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, VisNetworkTreeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
