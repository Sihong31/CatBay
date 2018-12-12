import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService } from '../user.service';
import { Cat } from 'src/app/cat-list/cat.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit, OnDestroy {
  cart: Cat[];
  userId: string;
  cartSubscription: Subscription;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userService.getCart(this.userId);
    this.cartSubscription = this.userService.getCartStatusListener()
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  onRemoveFromCart(catId: string) {
    this.userService.removeFromCart(this.userId, catId);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
