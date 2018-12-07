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

  constructor(private catsService: CatsService, private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.catsService.getCats()
      .subscribe((catData: { message: string, cats: Cat[] }) => {
        this.cats = catData.cats;
      });
  }

}
