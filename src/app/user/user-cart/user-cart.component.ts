import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { Cat } from 'src/app/cat-list/cat.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit, OnDestroy {
  cart: Cat[];
  userId: string;
  cartSubscription: Subscription;
  totalPrice: number;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userService.getCart(this.userId);
    this.cartSubscription = this.userService.getCartStatusListener()
      .subscribe(cart => {
        // resets this.totalPrice on each listen
        this.totalPrice = 0;
        this.cart = cart;
        this.cart.forEach(cat => {
          this.totalPrice += (cat.price);
        });
      });
  }

  onRemoveFromCart(catId: string) {
    this.userService.removeFromCart(this.userId, catId);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

}
