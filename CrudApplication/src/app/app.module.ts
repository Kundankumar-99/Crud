import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {  ReactiveFormsModule } from '@angular/forms';
import { TabledataComponent } from './tabledata/tabledata.component';



@NgModule({
  declarations: [AppComponent, NavbarComponent,TabledataComponent],
  imports: [BrowserModule, MatDialogModule, MatButtonModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
