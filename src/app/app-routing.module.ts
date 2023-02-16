import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VideogamesComponent} from "./pages/videogames/videogames.component";
import {NewsComponent} from "./pages/news/news.component";
import {ReviewsComponent} from "./pages/reviews/reviews.component";
import {UserGuard} from "./guard/user.guard";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  {
    path: 'videogames',
    component: VideogamesComponent,
    canActivate: [UserGuard],
  },
  {
    path:'news',
    component: NewsComponent,
    canActivate: [UserGuard],
  },
  {
    path:'reviews',
    component: ReviewsComponent,
    canActivate: [UserGuard],
  },
  {
    path:'',
    component:LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
