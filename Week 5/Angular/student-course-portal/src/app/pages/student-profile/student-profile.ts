import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css'
})
export class StudentProfile {

  student = {
    name: '',
    email: '',
    department: '',
    year: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log(this.student);
  }
}