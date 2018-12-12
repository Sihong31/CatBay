import { Component, OnInit, OnDestroy } from '@angular/core';

import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements OnInit {
  cats: Cat[];
  userIsAuthenticated: boolean;
  favoriteCats: [];
  userId: string;

  constructor(private catsService: CatsService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();

    this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    if (this.userIsAuthenticated) {
      this.userService.fetchUserData(this.userId);
      this.userService.getUserDataStatusListener()
        .subscribe((userData) => {
          this.favoriteCats = userData.favoriteCats;
          // get favoriteCats first and then get overall cats to do matching on
          this.catsService.getCats()
          .subscribe((catData: { message: string, cats: Cat[] }) => {
            this.cats = catData.cats;
            if (this.favoriteCats) {
              this.cats.map(cat => {
                this.favoriteCats.forEach((favoredCat: Cat) => {
                  if (cat._id === favoredCat._id) {
                    cat.favoriteCat = 'true';
                  }
                });
              });
            }
          });
        });
    // not logged in users just see a list of cats, no favorites
    } else {
      this.catsService.getCats()
      .subscribe((catData: { message: string, cats: Cat[] }) => {
        this.cats = catData.cats;
      });
    }
  }

}
