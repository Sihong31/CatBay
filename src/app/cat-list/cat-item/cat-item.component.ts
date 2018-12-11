import { Component, OnInit, Input, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Cat } from '../cat.model';
import { AuthService } from 'src/app/auth/auth.service';
import { CatsService } from '../cats.service';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent implements OnInit, OnDestroy  {
  @Input() cat: Cat;
  @Input () catId;
  authSub: Subscription;
  userIsAuthenticated: boolean;
  userId: string;

  constructor(
    private authService: AuthService,
    private catService: CatsService,
    private userService: UserService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();

    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onToggleFavorite(event: any) {
    const hasClass = event.target.classList.contains('isFavorite');
    if (!hasClass) {
      this.renderer.addClass(event.target, 'isFavorite');
      this.catService.addFavoriteCat(this.catId);
    } else {
      this.renderer.removeClass(event.target, 'isFavorite');
      this.catService.removeFavoriteCat(this.catId);
    }
  }

  onAddToCart() {
   this.userService.addToCart(this.userId, this.cat);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
