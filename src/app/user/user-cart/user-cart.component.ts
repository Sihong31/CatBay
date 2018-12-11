import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { Cat } from 'src/app/cat-list/cat.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {
  cart: Cat[];
  userId: string;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userService.getCart(this.userId)
      .subscribe(cartData => {
        this.cart = cartData.cart;
      });
  }

}
