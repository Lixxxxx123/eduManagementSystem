import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grading-container">
      <h2>课程打分</h2>
      <p>在这里您可以为学生的课程成绩进行评分。</p>
      <div class="placeholder-content">
        <p>功能开发中，敬请期待...</p>
      </div>
    </div>
  `,
  styles: [`
    .grading-container {
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
export class GradingComponent {}
