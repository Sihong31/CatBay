import { Component, OnInit, Input } from '@angular/core';
import { Cat } from '../cat.model';
import { CatDetailsComponent } from '../cat-details/cat-details.component';

@Component({
  selector: 'app-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent implements OnInit {
  @Input() cat: Cat;
  @Input () catId;

  constructor() { }

  ngOnInit() {
  }

}
