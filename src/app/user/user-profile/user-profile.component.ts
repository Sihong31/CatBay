import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

import { User } from '../user.model';
import { Cat } from 'src/app/cat-list/cat.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId: string;
  user: User;
  cats: Cat[];
  favoriteCats: Cat[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.fetchUserData();
    this.authService.getUserDataStatusListener()
      .subscribe((userData: User) => {
        this.user = userData;
        this.cats = this.user.cats;
        this.favoriteCats = this.user.favoriteCats;
      });
  }

}
