import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatListComponent } from './cat-list/cat-list.component';
import { CatItemComponent } from './cat-list/cat-item/cat-item.component';
import { CatDetailsComponent } from './cat-list/cat-details/cat-details.component';
import { CatsService } from './cat-list/cats.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatListComponent,
    CatItemComponent,
    CatDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [CatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
