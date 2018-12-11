import { Cat } from '../cat-list/cat.model';

export interface User {
  _id: string;
  email: string;
  favoriteCats: Cat[];
  cats: Cat[];
  cart: Cat[];
}
