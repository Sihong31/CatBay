import { Component, OnInit } from '@angular/core';

import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements OnInit {
  cats: Cat[];
  userIsAuthenticated: boolean;
  favoriteCats: [];

  constructor(private catsService: CatsService, private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    if (this.userIsAuthenticated) {
      this.authService.fetchUserData();
      this.authService.getUserDataStatusListener()
      .subscribe((userData) => {
        this.favoriteCats = userData.favoriteCats;
        // get favoriteCats first and then get overall cats to do matching on
        this.catsService.getCats()
        .subscribe((catData: { message: string, cats: Cat[] }) => {
          this.cats = catData.cats;
          if (this.favoriteCats) {
            this.cats.map(cat => {
              this.favoriteCats.forEach((favoredCat: any) => {
                if (cat._id === favoredCat._id) {
                  cat.favoriteCat = true;
                }
              });
            });
          }
        });
      });
    } else {
      this.catsService.getCats()
      .subscribe((catData: { message: string, cats: Cat[] }) => {
        this.cats = catData.cats;
      });
    }
  }

}
