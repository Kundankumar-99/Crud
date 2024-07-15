import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { CommonService } from '../common.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-tabledata',
  standalone: true,
  imports: [CommonModule, FormsModule,MatPaginator],  
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.css']
})

export class TabledataComponent implements OnInit {

  
  

@ViewChild(MatPaginator) paginator!: MatPaginator;

  userData = [
    {
      id : 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Yoga', minutes: 45 }
      ]
    },
    {
      id : 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 30 }
      ]
    }
  ];

  groupedUserData: any[] = [];
  searchText: string = '';
  selectedWorkoutType: string = 'All'; 
  

  constructor(private commonService: CommonService, private dialogService: CommonService) { }

  ngOnInit(): void {
    this.getUserData();
    
  }

  

  loadData() {
    console.log('Data loaded in TabledataComponent');
  }

  getUserData() {
    this.userData = this.commonService.getUserData() || [];
    console.log("userData", this.userData);
    this.groupUserWorkouts();
  }

  editinputform(id?: any) {
    console.log("id", id)
    this.dialogService.openUserInputDialog(id);
  }  

  groupUserWorkouts() {
    this.groupedUserData = this.userData.map(user => {
      const workoutMap = new Map<string, number>();

      user.workouts.forEach((workout: Workout) => {
        if (workoutMap.has(workout.type)) {
          workoutMap.set(workout.type, workoutMap.get(workout.type)! + workout.minutes);
        } else {
          workoutMap.set(workout.type, workout.minutes);
        }
      });

      const groupedWorkouts = Array.from(workoutMap, ([type, minutes]) => ({ type, minutes }));

      return {
        id : user.id,
        name: user.name,
        workouts: groupedWorkouts
      };
    });
  }

  get filteredUserData() {
    if (this.selectedWorkoutType === 'All') {
      return this.groupedUserData.filter(user => 
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      return this.groupedUserData.filter(user => 
        user.id && 
        user.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
        user.workouts.some((workout: Workout) => workout.type === this.selectedWorkoutType)
      );
    }
  }

  onWorkoutTypeChange(type: string) {
    this.selectedWorkoutType = type;
  }
  
}
