import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CatsService } from '../cats.service';
import { Cat } from '../cat.model';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss']
})
export class CatDetailsComponent implements OnInit {
  cat: Cat;
  catId: string;
  isLoading = true;
  userIsAuthenticated: boolean;

  constructor(private catsService: CatsService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.route.params.subscribe(
      (params) => {
        this.catId = params['catId'];
      }
    );
    this.catsService.getCat(this.catId)
      .subscribe((catData: {message: string, cat: Cat}) => {
        this.cat = catData.cat;
        this.isLoading = false;
      });
  }

  onDelete() {
    this.catsService.destroyCat(this.catId);
  }
}
