import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>综合看板</h2>
      <p>这里将显示您的学习进度和成绩统计。</p>
      <div class="placeholder-content">
        <p>功能开发中，敬请期待...</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
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
export class DashboardComponent {}
