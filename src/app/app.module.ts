import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatListComponent } from './cat-list/cat-list.component';
import { CatItemComponent } from './cat-list/cat-item/cat-item.component';
import { CatDetailsComponent } from './cat-list/cat-details/cat-details.component';
import { CatsService } from './cat-list/cats.service';
import { CatEditComponent } from './cat-list/cat-edit/cat-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatListComponent,
    CatItemComponent,
    CatDetailsComponent,
    CatEditComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [CatsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
