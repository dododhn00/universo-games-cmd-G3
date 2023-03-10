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
import { ReviewsListComponent } from './reviews-component/reviews-list/reviews-list.component';
import { VideogamesListComponent } from './videogames-component/videogames-list/videogames-list.component';
import { CategoryComponent } from './category-component/dialog/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { GamesEditDialogComponent } from './videogames-component/dialogs/edit-dialog/games-edit-dialog.component';
import { GamesAddDialogComponent } from './videogames-component/dialogs/add-dialog/games-add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GamesViewDialogComponent } from './videogames-component/dialogs/games-view-dialog/games-view-dialog.component';
import { NewsViewDialogComponent } from './news-component/dialogs/news-view-dialog/news-view-dialog.component';
import { NewsAddDialogComponent } from './news-component/dialogs/add-dialog/news-add-dialog/news-add-dialog.component';
import { NewsEditDialogComponent } from './news-component/dialogs/edit-dialog/news-edit-dialog/news-edit-dialog.component';
import {MatChipsModule} from "@angular/material/chips";
import { ReviewsAddDialogComponent } from './reviews-component/dialogs/reviews-add-dialog/reviews-add-dialog.component';
import { ReviewsEditDialogComponent } from './reviews-component/dialogs/reviews-edit-dialog/reviews-edit-dialog.component';
import { ReviewsViewDialogComponent } from './reviews-component/dialogs/reviews-view-dialog/reviews-view-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import { LoginFormComponent } from './auth-component/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { DeleteDialogComponent } from './shared/dialog/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    VideogamesComponent,
    NewsComponent,
    ReviewsComponent,
    NavbarComponent,
    NewsFormComponent,
    NewsListComponent,
    ReviewsListComponent,
    VideogamesListComponent,
    CategoryComponent,
    GamesEditDialogComponent,
    GamesAddDialogComponent,
    GamesViewDialogComponent,

    NewsViewDialogComponent,
    NewsAddDialogComponent,
    NewsEditDialogComponent,
    ReviewsAddDialogComponent,
    ReviewsEditDialogComponent,
    ReviewsViewDialogComponent,
    LoginFormComponent,
    LoginComponent,
    DeleteDialogComponent
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
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTabsModule,
    MatListModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
