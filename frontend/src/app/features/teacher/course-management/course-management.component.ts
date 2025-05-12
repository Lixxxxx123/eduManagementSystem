import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="course-management-container">
      <h2>课程管理</h2>
      <p>在这里您可以管理您的课程信息。</p>
      <div class="placeholder-content">
        <p>功能开发中，敬请期待...</p>
      </div>
    </div>
  `,
  styles: [`
    .course-management-container {
      padding: 15px;
    }
    
    h2 {
      color: #3f51b5;
      margin-bottom: 15px;
    }
    
    .placeholder-content {
      margin-top: 30px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 4px;
      text-align: center;
      color: #666;
    }
  `]
})
export class CourseManagementComponent {}
