import { Component, OnInit } from '@angular/core';
import { CatsService } from './cats.service';
import { Cat } from './cat.model';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss']
})
export class CatListComponent implements OnInit {
  cats: Cat[];

  constructor(private catsService: CatsService) { }

  ngOnInit() {
    this.cats = this.catsService.getCats();
  }

}
