import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../user.model';
import { Cat } from 'src/app/cat-list/cat.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userDataSubscription: Subscription;
  userId: string;
  user: User;
  cats: Cat[];
  favoriteCats: Cat[];

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    // get user data
    this.userService.fetchUserData(this.userId);
    this.userDataSubscription = this.userService.getUserDataStatusListener()
      .subscribe((userData: User) => {
        this.user = userData;
        this.cats = this.user.cats;
        this.favoriteCats = this.user.favoriteCats;
      });
  }

  ngOnDestroy() {
    // this.userDataSubscription.unsubscribe();
  }

}
