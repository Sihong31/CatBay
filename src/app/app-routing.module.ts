import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatListComponent } from './cat-list/cat-list.component';
import { CatDetailsComponent } from './cat-list/cat-details/cat-details.component';
import { CatEditComponent } from './cat-list/cat-edit/cat-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: CatListComponent, pathMatch: 'full' },
  { path: 'cats', component: CatListComponent },
  { path: 'cats/new', component: CatEditComponent },
  { path: 'cats/:catId', component: CatDetailsComponent },
  { path: 'cats/:catId/edit', component: CatEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-profile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
