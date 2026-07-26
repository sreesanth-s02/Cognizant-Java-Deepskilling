import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { authGuard } from './guards/auth-guard';
import { CourseDetail } from './pages/course-detail/course-detail';
import { NotFound } from './pages/not-found/not-found';
import { CoursesLayout } from './pages/courses-layout/courses-layout';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'courses',
    component: CoursesLayout,
    children : [
      {
        path: '',
        component: CourseList
      },

      {
        path: ':id',
        component: CourseDetail
      }
    ]
  },


{
  path: 'profile',
  component: StudentProfile,
  canActivate: [authGuard]
},

{
  path: 'enroll-reactive',
  loadChildren: () =>
    import('./pages/reactive-enrollment-form/enrollment.routes')
      .then(m => m.ENROLLMENT_ROUTES)
},

  {
    path: '**',
    component: NotFound
  }

];