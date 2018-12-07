import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  userId: string;
  authStatusListener = new Subject<boolean>();
  userDataStatusListener = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http.post<{message: string, userId: string}>('http://localhost:3000/auth/signup', authData)
      .subscribe((result) => {
        this.router.navigate(['/login']);
      });
  }

  loginUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http.post<{message: string, token: string, userId: string, expiresIn: number}>('http://localhost:3000/auth/login', authData)
      .subscribe((result) => {
        const token = result.token;
        if (token) {
          this.token = token;
          this.isAuthenticated = true;
          this.userId = result.userId;
          this.authStatusListener.next(true);
          this.fetchUserData();

          const expiresInDuration = result.expiresIn;
          this.setAuthTimer(expiresInDuration);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration);

          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  checkAuthUserStatus() {
    const authData = this.getAuthData();
    if (!authData) {
      return;
    }
    const now = new Date();
    const expiresInDuration = authData.expirationDate.getTime() - now.getTime();
    if (expiresInDuration > 0) {
      this.token = authData.token;
      this.isAuthenticated = true;
      this.userId = authData.userId;
      this.setAuthTimer(expiresInDuration);
      this.authStatusListener.next(true);
      this.fetchUserData();
    }
  }

  private fetchUserData() {
    this.http.get<{message: string, userData: any}>(`http://localhost:3000/auth/user/${this.userId}`)
      .subscribe(response => {
        this.userDataStatusListener.next(response.userData.favoriteCats);
      });
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
