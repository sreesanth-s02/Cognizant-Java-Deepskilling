import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CreditLabel } from '../../pipes/credit-label-pipe';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule,
    Highlight,
    CreditLabel
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  @Input()
  course!: {
    id:number;
    name:string;
    code:string;
    credits:number;
    gradeStatus:string;
  };

  @Output()
  enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  get cardClasses() {
    return {
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}