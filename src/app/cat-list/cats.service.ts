import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cat } from './cat.model';

@Injectable()
export class CatsService {
  // cats: Cat[] = [
  //   {
  //     name: 'Fluffy',
  //     description: 'This is a description of Fluffy',
  //     age: 2,
  //     weight: 50,
  //     price: 100,
  //     imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa4e2VF6cfou9oL0cc5OAzVTEbmAgFjIW2r-7lTkpOljG9k38N'
  //   },
  //   {
  //     name: 'Puffers',
  //     description: 'This is a description of Puffers',
  //     age: 3,
  //     weight: 65,
  //     price: 120,
  //     imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPP26PJ_TLT4tAMD_IJ2itpdjd_rJ2hKTk-gM8Sl_NtQghQnkOjw'
  //   },
  //   {
  //     name: 'Lazy',
  //     description: 'This is a description of Lazy',
  //     age: 6,
  //     weight: 80,
  //     price: 150,
  //     imagePath: 'https://images.pexels.com/photos/1460724/pexels-photo-1460724.jpeg?cs=srgb&dl=art-background-cat-cats-1460724.jpg&fm=jpg'
  //   },
  // ];

  constructor(private http: HttpClient) {}

  getCats() {
    return this.http.get<{message: string, cats: Cat[]}>('http://localhost:3000/cats');
  }

  getCat(id: number) {
    return this.http.get<{message: string, cat: Cat}>(`http://localhost:3000/cats/${id}`);
  }

  createCat(cat: Cat) {

  }

  updateCat(id: number, cat: Cat) {

  }

  destroyCat(id: number) {

  }
}
