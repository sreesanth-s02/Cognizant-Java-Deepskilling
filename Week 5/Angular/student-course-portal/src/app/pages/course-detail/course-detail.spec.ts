import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CourseDetail } from './course-detail';
import { CourseService } from '../../services/course';

describe('CourseDetail', () => {

  let component: CourseDetail;
  let fixture: ComponentFixture<CourseDetail>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              },
              queryParamMap: {
                get: () => 'view'
              }
            }
          }
        },
        {
          provide: CourseService,
          useValue: {
            getCourseById: () =>
              of({
                id: 1,
                name: 'Data Structures',
                code: 'CS101',
                credits: 4,
                gradeStatus: 'passed'
              })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetail);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});