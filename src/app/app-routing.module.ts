import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatListComponent } from './cat-list/cat-list.component';
import { CatDetailsComponent } from './cat-list/cat-details/cat-details.component';
import { CatEditComponent } from './cat-list/cat-edit/cat-edit.component';

const routes: Routes = [
  { path: '', component: CatListComponent, pathMatch: 'full' },
  { path: 'cats', component: CatListComponent },
  { path: 'cats/new', component: CatEditComponent },
  { path: 'cats/:catId', component: CatDetailsComponent },
  { path: 'cats/:catId/edit', component: CatEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
