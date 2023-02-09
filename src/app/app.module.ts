import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideogamesComponent } from './pages/videogames/videogames.component';
import { NewsComponent } from './pages/news/news.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NewsFormComponent } from './news-component/news-form/news-form.component';
import { NewsListComponent } from './news-component/news-list/news-list.component';
import { ReviewsFormComponent } from './reviews-component/reviews-form/reviews-form.component';
import { ReviewsListComponent } from './reviews-component/reviews-list/reviews-list.component';
import { VideogamesListComponent } from './videogames-component/videogames-list/videogames-list.component';
import { VideogamesFormComponent } from './videogames-component/videogames-form/videogames-form.component';
import { CategoryFormComponent } from './category-component/category-form/category-form.component';
import { CategoryListComponent } from './category-component/category-list/category-list.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    VideogamesComponent,
    NewsComponent,
    ReviewsComponent,
    NavbarComponent,
    NewsFormComponent,
    NewsListComponent,
    ReviewsFormComponent,
    ReviewsListComponent,
    VideogamesListComponent,
    VideogamesFormComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CategoriesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
