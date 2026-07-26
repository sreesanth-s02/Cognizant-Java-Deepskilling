import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {

  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cdr : ChangeDetectorRef
  ) {}

ngOnInit(): void {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  const mode = this.route.snapshot.queryParamMap.get('mode');

  console.log('Mode:', mode);

  this.courseService.getCourseById(id).subscribe({

    next: (course) => {
      console.log('Course:', course);
      this.course = course;
      this.cdr.detectChanges();
    },

    error: (err) => {
      console.error(err);
    }

  });

}

}