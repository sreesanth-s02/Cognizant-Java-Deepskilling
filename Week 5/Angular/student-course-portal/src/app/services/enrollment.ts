import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { CourseService } from './course';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourses: Course[] = [];

  constructor(
    private courseService: CourseService
  ) {}

enroll(courseId: number): void {

  this.courseService.getCourseById(courseId).subscribe({

    next: (course) => {

      if (!this.enrolledCourses.find(c => c.id === courseId)) {
        this.enrolledCourses.push(course);
      }

    },

    error: (err) => {
      console.error(err);
    }

  });

}

  getEnrolledCourses(): Course[] {
    return this.enrolledCourses;
  }

  getEnrollmentCount(): number {
    return this.enrolledCourses.length;
  }

}