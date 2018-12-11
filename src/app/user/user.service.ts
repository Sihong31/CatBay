import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cat } from '../cat-list/cat.model';

@Injectable()
export class UserService {
  userDataStatusListener = new Subject<any>();

  constructor(private http: HttpClient) {}

  fetchUserData(id: string) {
    this.http.get<{message: string, userData: any}>(`http://localhost:3000/users/${id}`)
      .subscribe(response => {
        this.userDataStatusListener.next(response.userData);
      });
  }

  getCart(id: string) {
    return this.http.get<{message: string, cart: Cat[]}>(`http://localhost:3000/users/${id}/cart`);
  }

  addToCart(id: string, cat: Cat) {
    this.http.post<{message: string}>(`http://localhost:3000/users/${id}/cart`, {cat: cat})
      .subscribe(result => {});
  }

  getUserDataStatusListener() {
    return this.userDataStatusListener.asObservable();
  }
}
