import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./student.component').then(c => c.StudentComponent),
    children: [
      {
        path: 'courses',
        loadComponent: () => import('./courses/courses.component').then(c => c.CoursesComponent)
      },
      {
        path: 'mentor-selection',
        loadComponent: () => import('./mentor-selection/mentor-selection.component').then(c => c.MentorSelectionComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      { path: '', redirectTo: 'courses', pathMatch: 'full' }
    ]
  }
];