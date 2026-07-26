import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { noCourseCode } from '../../validators/course-code.validator';
import { simulateEmailCheck } from '../../validators/email.validator';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm {

  enrollForm: FormGroup;

  constructor(
  private fb: FormBuilder,
  private courseService: CourseService
  ) {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          simulateEmailCheck
        ]
      ],

      courseId: [
        '',
        [
          Validators.required,
          noCourseCode
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([])

    });

  }

  // Getter for FormArray
  get additionalCourses(): FormArray<FormControl> {
    return this.enrollForm.get('additionalCourses') as FormArray<FormControl>;
  }
  // Add a new course textbox
  addCourse(): void {
    this.additionalCourses.push(
    new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    })
  );
  }

  // Remove a course textbox
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  // Submit form
  onSubmit(): void {

    if (this.enrollForm.valid) {
      const form = this.enrollForm.value;
      const newCourse = {

        name: form.studentName!,
        code: form.courseId!,
        credits: 4,
        gradeStatus: 'pending' as const

      };

      this.courseService.createCourse(newCourse).subscribe({

        next: (course) => {

          console.log('Created:', course);

          alert('Course Added Successfully');

          this.enrollForm.reset();

        },

        error: (err) => {

          console.error(err);

        }

      });
    } else {
      this.enrollForm.markAllAsTouched();
    }

  }

}