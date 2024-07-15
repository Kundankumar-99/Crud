import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
// import { UserDataService } from '../user-data.Service';
import { json } from 'stream/consumers';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  HCTobjData! : any[]

  // constructor(private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
  //   // Initialize nextId based on localStorage data
  //   const HCTFormData = localStorage.getItem('userData');
  //   const HCTobjData = HCTFormData ? JSON.parse(HCTFormData) : [];   
  //   this.nextId = Array.isArray(HCTobjData) ? HCTobjData.length + 1 : 1;

  //   // Initialize the form with FormBuilder
  //   this.hctForm = this._fb.group({
  //     id: [this.nextId],
  //     name: ['', Validators.required],
  //     type: ['', Validators.required],
  //         minutes: ['', Validators.required],
      
  //   });
  // }

  constructor(private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    // Initialize nextId based on localStorage data
    const HCTFormData = localStorage.getItem('userData');
    this.HCTobjData = HCTFormData ? JSON.parse(HCTFormData) : []; // Assign to class property
  
    this.nextId = Array.isArray(this.HCTobjData) ? this.HCTobjData.length + 1 : 1;
  
    // Initialize the form with FormBuilder
    this.hctForm = this._fb.group({
      id: [this.nextId],
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', Validators.required],
    });
  }



  ngOnInit(): void {

    console.log("onit log", this.data);
    
    if (this.data?.id) {
      const foundData = this.HCTobjData.find(item => item.id === this.data.id);
      console.log(foundData);
      if (foundData) {
        this.hctForm.patchValue({
          id: foundData.id,
          name: foundData.name,
        });
      }
    }
  }
  
  

 

  onSubmit() {
   
    if (this.hctForm.valid) {
      const foundData = this.HCTobjData.find(item => item.id === this.data.id);
      console.log("foundData", foundData)
      let formData = {} 
      if(foundData){
         formData = {
          
          id: foundData.id,
        name: foundData.name,
        workouts: [
          ...foundData.workouts,
          {
            type : this.hctForm.value.type,
            minutes : this.hctForm.value.minutes,

          }
        ]
        }
      }
      else{
        // Prepare form data to be stored
         formData = {


          id: this.hctForm.value.id,
          name: this.hctForm.value.name,
          workouts: [
            {
              type : this.hctForm.value.type,
              minutes : this.hctForm.value.minutes,
  
            }
          ]
        };

      }
      
      console.log(formData);




      console.log("FormData", formData);
      // Retrieve existing data from localStorage
      const HCTFormData = localStorage.getItem('userData');
      const HCTobjData = HCTFormData ? JSON.parse(HCTFormData) : [];

      // Console Value Item
      console.log(this.hctForm.value);

      // Add new form data to existing data
      const newData = [...HCTobjData, formData];
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
        type: ['', Validators.required],
          minutes: ['', Validators.required],
       
      });
    } else {
      // Error Handled
      console.error('Form is invalid. Please check the fields.');
    }
  }
}
