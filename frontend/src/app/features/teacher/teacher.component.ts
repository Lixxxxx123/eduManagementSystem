import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="teacher-container">
      <h1>教师面板</h1>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .teacher-container {
      padding: 20px;
    }
    
    h1 {
      color: #3f51b5;
      margin-bottom: 20px;
    }
    
    .content {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
  `]
})
export class TeacherComponent {}