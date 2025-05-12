import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // 如果用户已登录，则重定向到相应页面
    if (this.authService.currentUserValue) {
      if (this.authService.currentUserValue.role === 'student') {
        this.router.navigate(['/student']);
      } else {
        this.router.navigate(['/teacher']);
      }
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // 获取返回URL，如果没有则默认为'/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // 方便访问表单控件
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // 如果表单无效则停止
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // 登录成功，路由已在服务中处理
        },
        error: error => {
          this.error = error.error.message || '登录失败，请检查用户名和密码';
          this.loading = false;
        }
      });
  }
}
