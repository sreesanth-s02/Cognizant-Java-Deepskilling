import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';

import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  isLoading = true;

  selectedCourseId = 0;

  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {

    this.isLoading = true;

    this.courseService.getCourses().subscribe({

      next: (courses) => {
        this.courses = courses;
        this.isLoading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('HTTP Error:', err);
        this.isLoading = false;
      }

    });

  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  viewCourse(courseId: number): void {

    this.router.navigate(
      ['/courses', courseId],
      {
        queryParams: {
          mode: 'view'
        }
      }
    );

  }

  updateCourse(course: Course): void {

    const updatedCourse: Course = {
      ...course,
      gradeStatus: 'passed'
    };

    this.courseService.updateCourse(updatedCourse).subscribe({

      next: () => {
        alert('Course Updated Successfully');
        this.loadCourses();
      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  deleteCourse(id: number): void {

    if (!confirm('Delete this course?')) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({

      next: () => {
        alert('Course Deleted Successfully');
        this.loadCourses();
      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  onEnroll(courseId: number): void {

    this.enrollmentService.enroll(courseId);

    this.selectedCourseId = courseId;

    console.log(
      'Enrolled Courses:',
      this.enrollmentService.getEnrolledCourses()
    );

  }

}