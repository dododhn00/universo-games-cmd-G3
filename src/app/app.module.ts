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
import { CategoryFormComponent } from './category-component/category-form/category-form.component';
import { CategoryListComponent } from './category-component/category-list/category-list.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";

import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import { GamesEditDialogComponent } from './videogames-component/dialogs/edit-dialog/games-edit-dialog.component';
import { GamesAddDialogComponent } from './videogames-component/dialogs/add-dialog/games-add-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { GamesViewDialogComponent } from './videogames-component/dialogs/games-view-dialog/games-view-dialog.component';
import {MatChipsModule} from "@angular/material/chips";




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

    CategoryFormComponent,
    CategoryListComponent,
    CategoriesComponent,
    GamesEditDialogComponent,
    GamesAddDialogComponent,
    GamesViewDialogComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        HttpClientModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
