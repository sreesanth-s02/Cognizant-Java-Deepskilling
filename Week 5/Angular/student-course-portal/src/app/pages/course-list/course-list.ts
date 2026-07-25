import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';
import { CommonModule } from '@angular/common';

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
export class CourseList {

  selectedCourseId = 0;

  courses = [

    {
      id:1,
      name:'Angular',
      code:'CS101',
      credits:4
    },

    {
      id:2,
      name:'Java',
      code:'CS102',
      credits:3
    },

    {
      id:3,
      name:'Spring Boot',
      code:'CS103',
      credits:4
    },

    {
      id:4,
      name:'SQL',
      code:'CS104',
      credits:2
    },

    {
      id:5,
      name:'AI',
      code:'CS105',
      credits:5
    }

  ];

  onEnroll(courseId:number){

    console.log(
      'Enrolling in course:',
      courseId
    );

    this.selectedCourseId=courseId;

  }

}