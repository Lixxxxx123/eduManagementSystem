import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentor-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mentor-selection-container">
      <h2>导师双选</h2>
      <p>在这里您可以查看可选导师并提交申请。</p>
      <div class="placeholder-content">
        <p>功能开发中，敬请期待...</p>
      </div>
    </div>
  `,
  styles: [`
    .mentor-selection-container {
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
export class MentorSelectionComponent {}
