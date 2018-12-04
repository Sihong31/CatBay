import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatListComponent } from './cat-list/cat-list.component';
import { CatDetailsComponent } from './cat-list/cat-details/cat-details.component';

const routes: Routes = [
  { path: '', component: CatListComponent, pathMatch: 'full' },
  { path: 'cats', component: CatListComponent },
  { path: 'cat-details', component: CatDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
