import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';

import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Home,
    CourseList,
    StudentProfile,
    ReactiveEnrollmentForm
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}