import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { CourseList } from './course-list';
import { EnrollmentService } from '../../services/enrollment';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

describe('CourseList', () => {

  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideMockStore(),
        provideRouter([]),
        {
          provide: EnrollmentService,
          useValue: {
            getEnrollments: () => of([])
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    store.overrideSelector(selectAllCourses, []);
    store.overrideSelector(selectCoursesLoading, false);
    store.overrideSelector(selectCoursesError, null);

    store.refreshState();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});