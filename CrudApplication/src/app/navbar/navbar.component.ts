
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserinputComponent } from '../userinput/userinput.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
      ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dialogService: CommonService) {}

  userinputform(id?: number) {
    this.dialogService.openUserInputDialog(id);
  }
}