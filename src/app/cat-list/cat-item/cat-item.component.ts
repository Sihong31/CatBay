import { Component, OnInit, Input } from '@angular/core';

import { Cat } from '../cat.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent implements OnInit {
  @Input() cat: Cat;
  @Input () catId;
  userIsAuthenticated: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
}
