import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-tabledata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabledata.component.html',
  styleUrl: './tabledata.component.css'
})
export class TabledataComponent implements OnInit {

  userData: any[] = [];

  constructor(private commonService: CommonService) {}


  ngOnInit():void {
    this.getUserData()
  }

  loadData() {
    console.log('Data loaded in TabledataComponent');
  }
  getUserData(){
    this.userData = this.commonService.getUserData();
    console.log("userData",this.userData);

  }
}
