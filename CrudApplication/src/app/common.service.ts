import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserinputComponent } from './userinput/userinput.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private _dialog: MatDialog) {}

  openUserInputDialog(id?: number) {
    this._dialog.open(UserinputComponent, {
      data: { id: id }
    });
  }

  getUserData() {
    const HCTFormData = localStorage.getItem('userData');
    return HCTFormData ? JSON.parse(HCTFormData) : [];
  }

}
