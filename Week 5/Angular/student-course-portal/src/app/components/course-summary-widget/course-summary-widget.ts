import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService
  ) {}

ngOnInit() {

  this.courseService.getCourses().subscribe({

    next: (courses) => {
      this.courses = courses;
    },

    error: (err) => {
      console.error(err);
    }

  });

}

}