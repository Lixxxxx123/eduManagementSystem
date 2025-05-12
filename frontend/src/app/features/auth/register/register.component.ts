import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
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

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['student', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // 自定义验证器：确保两个密码字段匹配
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  // 方便访问表单控件
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // 如果表单无效则停止
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(
      this.f['username'].value,
      this.f['password'].value,
      this.f['role'].value
    )
      .pipe(first())
      .subscribe({
        next: () => {
          // 注册成功，路由已在服务中处理
        },
        error: error => {
          this.error = error.error.message || '注册失败，请稍后再试';
          this.loading = false;
        }
      });
  }
}