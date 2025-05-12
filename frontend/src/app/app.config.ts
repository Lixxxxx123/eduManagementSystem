import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpRequest } from '@angular/common/http';
import { HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

// 创建一个符合HttpInterceptorFn类型的拦截器函数
const authInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // 获取当前用户
  const currentUser = authService.currentUserValue;
  
  // 如果用户已登录且有令牌，则添加授权头
  if (currentUser && currentUser.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.token}`
      }
    });
  }
  
  // 处理请求并捕获错误
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 如果是401未授权错误，则登出用户
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptorFn]))
  ]
};
