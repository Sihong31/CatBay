import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  createUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http.post<{message: string, userId: string}>('http://localhost:3000/auth/signup', authData)
      .subscribe((result) => {
        this.router.navigate(['/login']);
      });
  }

  loginUser(email: string, password: string) {
    const authData = { email: email, password: password };
    this.http.post<{message: string}>('http://localhost:3000/auth/login', authData)
      .subscribe((result) => {
        this.router.navigate(['/']);
      });
  }
}
