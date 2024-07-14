import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TabledataComponent } from './tabledata/tabledata.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,TabledataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit  {

  title = 'CrudApplication';

 
  @ViewChild(TabledataComponent) tabledataComponent!: TabledataComponent;

  ngAfterViewInit() {
    
    this.tabledataComponent.loadData();
  }
 
}
