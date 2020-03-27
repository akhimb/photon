import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './helpers/page-not-found.component';
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule,AppRoutingModule ],
  declarations: [ AppComponent,PageNotFoundComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
