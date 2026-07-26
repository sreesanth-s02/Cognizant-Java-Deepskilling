import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import {
  map,
  tap,
 catchError,
  retry,
  switchMap,
  throwError
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  // Base URL for JSON Server
  private apiUrl = 'http://localhost:3000/courses';

  // Sample data (not used once HTTP is enabled, but kept for reference)
  private courses: Course[] = [
    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Operating Systems',
      code: 'CS201',
      credits: 4,
      gradeStatus: 'pending'
    },
    {
      id: 3,
      name: 'Database Systems',
      code: 'CS301',
      credits: 3,
      gradeStatus: 'passed'
    },
    {
      id: 4,
      name: 'Computer Networks',
      code: 'CS401',
      credits: 4,
      gradeStatus: 'failed'
    },
    {
      id: 5,
      name: 'Artificial Intelligence',
      code: 'CS501',
      credits: 3,
      gradeStatus: 'pending'
    }
  ];

  // GET - All Courses
getCourses(): Observable<Course[]> {

  return this.http.get<Course[]>(this.apiUrl).pipe(

    retry(2),

    tap(courses => {
      console.log('Courses Loaded:', courses);
    }),

    map(courses =>
      courses.sort((a, b) => a.name.localeCompare(b.name))
    ),

    catchError(error => {

      console.error('Error fetching courses:', error);

      return throwError(() => error);

    })

  );

}

  // GET - Course by ID
getCourseById(id: number): Observable<Course> {

  return this.http.get<Course>(
    `${this.apiUrl}/${id}`
  ).pipe(

    tap(course => {
      console.log('Course:', course);
    }),

    catchError(error => {

      console.error(error);

      return throwError(() => error);

    })

  );

}

getCourseAndRefresh(id: number): Observable<Course> {

  return this.http.get<Course>(
    `${this.apiUrl}/${id}`
  ).pipe(

    switchMap(course =>

      this.http.get<Course>(
        `${this.apiUrl}/${course.id}`
      )

    )

  );

}

  // POST - Add Course
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // POST - Create Course (Workbook Method)
  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // PUT - Update Course
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(
      `${this.apiUrl}/${course.id}`,
      course
    );
  }

  // DELETE - Remove Course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

}