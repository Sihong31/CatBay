import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Cat } from './cat.model';

@Injectable()
export class CatsService {

  constructor(private http: HttpClient, private router: Router) {}

  getCats() {
    return this.http.get<{message: string, cats: Cat[]}>('http://localhost:3000/cats');
  }

  getCat(id: string) {
    return this.http.get<{message: string, cat: Cat}>(`http://localhost:3000/cats/${id}`);
  }

  addFavoriteCat(catId: string) {
    this.http.post<{message: string}>('http://localhost:3000/cats/favorite', { catId: catId })
      .subscribe(result => {
      });
  }

  removeFavoriteCat(catId: string) {
    this.http.post<{message: string}>('http://localhost:3000/cats/removeFavorite', { catId: catId })
      .subscribe(result => {
      });
  }

  createCat(cat: Cat) {
    this.http.post<{message: string, cat: Cat}>('http://localhost:3000/cats', cat)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  updateCat(id: string, cat: Cat) {
    this.http.put<{message: string, cat: Cat}>(`http://localhost:3000/cats/${id}`, cat)
      .subscribe((result) => {
        this.router.navigate(['/']);
      });
  }

  destroyCat(id: string) {
    this.http.delete<{message: string}>(`http://localhost:3000/cats/${id}`)
      .subscribe((result) => {
        this.router.navigate(['/']);
      });
  }
}
