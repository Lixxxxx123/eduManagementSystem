import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 获取当前用户
    const currentUser = this.authService.currentUserValue;
    
    // 如果用户已登录且有令牌，则添加授权头
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    
    // 处理请求并捕获错误
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // 如果是401未授权错误，则登出用户
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

// 添加这个工厂函数，用于Angular的withInterceptors API
export function authInterceptor(
  authService: AuthService,
  router: Router
) {
  return new AuthInterceptor(authService, router);
}
