import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideogamesComponent} from "./pages/videogames/videogames.component";
import {NewsComponent} from "./pages/news/news.component";
import {ReviewsComponent} from "./pages/reviews/reviews.component";
import {CategoriesComponent} from "./pages/categories/categories.component";

const routes: Routes = [
  {
    path: '',
    component: VideogamesComponent
  },
  {
    path:'news',
    component: NewsComponent
  },
  {
    path:'reviews',
    component: ReviewsComponent
  },
  {
    path:'categories',
    component: CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
