import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  role: 'student' | 'teacher';
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private router: Router) {
    // 从本地存储中获取用户信息
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(user => {
          // 存储用户详细信息和JWT令牌在本地存储中
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          // 根据角色导航到相应页面
          if (user.role === 'student') {
            this.router.navigate(['/student']);
          } else {
            this.router.navigate(['/teacher']);
          }
        })
      );
  }
  
  register(username: string, password: string, role: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, { username, password, role })
      .pipe(
        tap(user => {
          // 存储用户详细信息和JWT令牌在本地存储中
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          // 根据角色导航到相应页面
          if (user.role === 'student') {
            this.router.navigate(['/student']);
          } else {
            this.router.navigate(['/teacher']);
          }
        })
      );
  }

  logout(): void {
    // 从本地存储中移除用户
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }
}
