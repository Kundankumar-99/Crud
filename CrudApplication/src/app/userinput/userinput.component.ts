import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
// import { UserDataService } from '../user-data.Service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-userinput',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatLabel, ReactiveFormsModule],
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.css'],
})
export class UserinputComponent {
  hctForm: FormGroup;
  nextId: number = 1;

  constructor(private _fb: FormBuilder) {


     // Initialize nextId based on localStorage data
    const HCTFormData = localStorage.getItem('userData');
    const HCTobjData = HCTFormData ? JSON.parse(HCTFormData) : [];   
    this.nextId = Array.isArray(HCTobjData) ? HCTobjData.length + 1 : 1;

    // Initialize the form with FormBuilder
    this.hctForm = this._fb.group({
      id: [this.nextId],
      name: ['', Validators.required],
      workouts: [
        {
      type: ['', Validators.required],
      minutes: ['', Validators.required],
        },
      ],
    });
  }

  onSubmit() {
    if (this.hctForm.valid) {
      // Prepare form data to be stored
      const FormData = {
        id: this.hctForm.value.id,
        name: this.hctForm.value.name,
        workouts: [
          {
            type: this.hctForm.value.type,
            minutes: this.hctForm.value.minutes,
          },
        ],
      };

      console.log("FormData",FormData)
      // Retrieve existing data from localStorage
      const HCTFormData = localStorage.getItem('userData');
      const HCTobjData = HCTFormData ? JSON.parse(HCTFormData) : [];

      // Console Value Item
      console.log(this.hctForm.value);

      // Add new form data to existing data
      const newData = [...HCTobjData, FormData];
      console.log("newData", newData);

      // Store updated data back into localStorage
      const userData = JSON.stringify(newData);
      localStorage.setItem('userData', userData);
      console.log(userData);

      // Increment Id for the next form entry
      this.nextId++;
      this.hctForm.patchValue({ id: this.nextId });

      // Form Will Be Reset after Submission
      this.hctForm.reset({
        id: this.nextId,
        name: '',
        type: '',
        minutes: '',
      });
    } else {
      // Error Handled
      console.error('Form is invalid. Please check the fields.');
    }
  }
}

