import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.authService.getUserDataStatusListener()
      .subscribe(userData => {
        console.log(userData);
      });
  }

}
