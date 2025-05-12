import { Routes } from '@angular/router';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./teacher.component').then(c => c.TeacherComponent),
    children: [
      {
        path: 'course-management',
        loadComponent: () => import('./course-management/course-management.component').then(c => c.CourseManagementComponent)
      },
      {
        path: 'grading',
        loadComponent: () => import('./grading/grading.component').then(c => c.GradingComponent)
      },
      {
        path: 'selection-management',
        loadComponent: () => import('./selection-management/selection-management.component').then(c => c.SelectionManagementComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      { path: '', redirectTo: 'course-management', pathMatch: 'full' }
    ]
  }
];