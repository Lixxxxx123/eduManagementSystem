import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // 检查用户是否已登录
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
    // 检查用户是否有访问该路由所需的角色
    const requiredRole = route.data['role'] as string;
    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      // 如果用户没有所需角色，则重定向到相应的页面
      if (this.authService.currentUserValue?.role === 'student') {
        this.router.navigate(['/student']);
      } else {
        this.router.navigate(['/teacher']);
      }
      return false;
    }
    
    return true;
  }
}
