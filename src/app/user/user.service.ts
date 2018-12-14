import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Cat } from '../cat-list/cat.model';

@Injectable()
export class UserService {
  userDataStatusListener = new Subject<any>();
  cartStatusListener = new Subject<any>();

  constructor(private http: HttpClient) {}

  fetchUserData(id: string) {
    this.http.get<{message: string, userData: any}>(`http://localhost:3000/users/${id}`)
      .subscribe(response => {
        this.userDataStatusListener.next(response.userData);
      });
  }

  getCart(id: string) {
    this.http.get<{message: string, cart: Cat[]}>(`http://localhost:3000/users/${id}/cart`)
      .subscribe(cartData => {
        this.cartStatusListener.next(cartData.cart);
      });
  }

  addToCart(userId: string, cat: Cat) {
    this.fetchUserData(userId);
    this.http.post<{message: string, cart: Cat[]}>(`http://localhost:3000/users/${userId}/cart`, {cat: cat})
      .subscribe(cartData => {
        this.cartStatusListener.next(cartData.cart);
      });
  }

  removeFromCart(userId: string, catId: string) {
    this.http.request<{message: string, cart: Cat[]}>('delete', `http://localhost:3000/users/${userId}/cart`, {body: {catId: catId}})
      .subscribe(cartData => {
        this.cartStatusListener.next(cartData.cart);
      });
  }

  getUserDataStatusListener() {
    return this.userDataStatusListener.asObservable();
  }

  getCartStatusListener() {
    return this.cartStatusListener.asObservable();
  }
}
