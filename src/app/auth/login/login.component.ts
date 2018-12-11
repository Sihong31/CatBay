import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAuthenticated;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.email, form.value.password);
    this.authService.getAuthStatusListener()
      .subscribe(
        isAuthenticated => {
          this.isAuthenticated = isAuthenticated;
        }
      );
  }
}
