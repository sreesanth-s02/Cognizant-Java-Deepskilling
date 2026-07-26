import { Injectable, inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';

import {
  catchError,
  map,
  switchMap
} from 'rxjs/operators';

import * as CourseActions from './course.actions';

import { CourseService } from '../../services/course';

@Injectable()
export class CourseEffects {

  private actions$ = inject(Actions);

  private courseService = inject(CourseService);

  // Load Courses
  loadCourses$ = createEffect(() =>

    this.actions$.pipe(

      ofType(CourseActions.loadCourses),

      switchMap(() =>

        this.courseService.getCourses().pipe(

          map(courses =>
            CourseActions.loadCoursesSuccess({
              courses
            })
          ),

          catchError(error =>
            of(
              CourseActions.loadCoursesFailure({
                error: error.message
              })
            )
          )

        )

      )

    )

  );

  // Update Course
  updateCourse$ = createEffect(() =>

    this.actions$.pipe(

      ofType(CourseActions.updateCourse),

      switchMap(({ course }) =>

        this.courseService.updateCourse(course).pipe(

          map(updatedCourse =>
            CourseActions.updateCourseSuccess({
              course: updatedCourse
            })
          ),

          catchError(error =>
            of(
              CourseActions.updateCourseFailure({
                error: error.message
              })
            )
          )

        )

      )

    )

  );

  // Delete Course
  deleteCourse$ = createEffect(() =>

    this.actions$.pipe(

      ofType(CourseActions.deleteCourse),

      switchMap(({ id }) =>

        this.courseService.deleteCourse(id).pipe(

          map(() =>
            CourseActions.deleteCourseSuccess({
              id
            })
          ),

          catchError(error =>
            of(
              CourseActions.deleteCourseFailure({
                error: error.message
              })
            )
          )

        )

      )

    )

  );

}