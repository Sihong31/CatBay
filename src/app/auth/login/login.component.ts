import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  isAuthenticated;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.email, form.value.password);
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(
        isAuthenticated => {
          this.isAuthenticated = isAuthenticated;
        }
      );
  }

  ngOnDestroy() {
    // this.authSub.unsubscribe();
  }
}
