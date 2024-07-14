import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  getUserData() {
    const HCTFormData = localStorage.getItem('userData');
    return HCTFormData ? JSON.parse(HCTFormData) : [];
  }
}
