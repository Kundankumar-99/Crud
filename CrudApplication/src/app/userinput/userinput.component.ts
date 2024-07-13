import { Component } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-userinput',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel],
  templateUrl: './userinput.component.html',
  styleUrl: './userinput.component.css'
})
export class UserinputComponent {

}
