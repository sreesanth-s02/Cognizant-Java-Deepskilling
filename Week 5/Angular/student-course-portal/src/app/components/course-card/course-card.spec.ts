import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {

  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseCard]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it('should render course details', () => {

    component.course = {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    } as Course;

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Data Structures');
    expect(compiled.textContent).toContain('CS101');
    expect(compiled.textContent).toContain('4');
    expect(compiled.textContent).toContain('Passed');

  });

  it('should emit enrollRequested when Enroll button is clicked', () => {

    component.course = {
      id: 10,
      name: 'Angular',
      code: 'AI501',
      credits: 3,
      gradeStatus: 'pending'
    } as Course;

    fixture.detectChanges();

    const emitSpy = vi.fn();
    component.enrollRequested.emit = emitSpy;

    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(emitSpy).toHaveBeenCalledWith(10);

  });

});