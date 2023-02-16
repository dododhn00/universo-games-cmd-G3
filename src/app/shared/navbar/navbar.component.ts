import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {CategoriesService} from "../../category-component/service/categories.service";
import {CategoryComponent} from "../../category-component/dialog/category.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../auth-component/service/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  activeSection = 'videogames';

  constructor(private router:Router,
              private categoriesService:CategoriesService,
              private dialog: MatDialog) {}


  swapActive(url: string) {
    this.activeSection = url;
  }

  ngOnInit() {
    // this.router.navigateByUrl('');
  }


  openDialog() {
    this.dialog.open(CategoryComponent, {
      panelClass: 'category-dialog'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.categoriesService.getCategories();
      }
    });
  }

}
