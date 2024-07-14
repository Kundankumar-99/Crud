import { Component } from '@angular/core';
import { UserinputComponent } from '../userinput/userinput.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  constructor (private _dialog: MatDialog){}

  userinputform(){
    
    this._dialog.open(UserinputComponent);
  }

}
