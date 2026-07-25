import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';

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

  courses = [
    {
      id: 1,
      name: 'Angular',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Java',
      code: 'CS102',
      credits: 3,
      gradeStatus: 'failed'
    },
    {
      id: 3,
      name: 'Spring Boot',
      code: 'CS103',
      credits: 4,
      gradeStatus: 'pending'
    },
    {
      id: 4,
      name: 'SQL',
      code: 'CS104',
      credits: 2,
      gradeStatus: 'passed'
    },
    {
      id: 5,
      name: 'AI',
      code: 'CS105',
      credits: 5,
      gradeStatus: 'pending'
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  trackByCourseId(index: number, course: any) {
    return course.id;
  }

  onEnroll(courseId: number) {
    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;
  }
}