import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CatsService } from '../cats.service';
import { Cat } from '../cat.model';


@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.scss']
})
export class CatDetailsComponent implements OnInit {
  cat: Cat;
  catId: number;

  constructor(private catsService: CatsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.catId = +params['id'];
        this.cat = this.catsService.getCat(this.catId);
      }
    );
    // this.cat = this.catsService.getCat(0);
  }

}
