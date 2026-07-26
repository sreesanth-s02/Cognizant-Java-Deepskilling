import { createReducer, on } from '@ngrx/store';
import * as CourseActions from './course.actions';
import { Course } from '../../models/course.model';

export interface CourseState {

  courses: Course[];

  loading: boolean;

  error: string | null;

}

export const initialState: CourseState = {

  courses: [],

  loading: false,

  error: null

};

export const courseReducer = createReducer(

  initialState,

  on(CourseActions.loadCourses, state => ({

    ...state,

    loading: true,

    error: null

  })),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({

    ...state,

    courses,

    loading: false

  })),

  on(CourseActions.loadCoursesFailure, (state, { error }) => ({

    ...state,

    loading: false,

    error

  })),
  on(CourseActions.updateCourseSuccess, (state, { course }) => ({
  ...state,
  courses: state.courses.map(c =>
    c.id === course.id ? course : c
  )
})),

on(CourseActions.deleteCourseSuccess, (state, { id }) => ({
  ...state,
  courses: state.courses.filter(c => c.id !== id)
}))

);