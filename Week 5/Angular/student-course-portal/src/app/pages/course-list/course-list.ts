import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';

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

  isLoading = false;
  selectedCourseId = 0;


  courses$: Observable<Course[]>;

  constructor(
    private store: Store,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {

    this.courses$ = this.store.select(selectAllCourses);

  }

  ngOnInit(): void {

    this.store.dispatch(
      CourseActions.loadCourses()
    );

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

    this.store.dispatch(

      CourseActions.updateCourse({

        course: updatedCourse

      })

    );

    alert('Course Updated Successfully');

  }

  deleteCourse(id: number): void {

    if (!confirm('Delete this course?')) {

      return;

    }

    this.store.dispatch(

      CourseActions.deleteCourse({

        id

      })

    );

    alert('Course Deleted Successfully');

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